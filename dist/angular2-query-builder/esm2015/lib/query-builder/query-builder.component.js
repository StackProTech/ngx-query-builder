import { NG_VALUE_ACCESSOR, NG_VALIDATORS, } from "@angular/forms";
import { QueryOperatorDirective } from "./query-operator.directive";
import { QueryFieldDirective } from "./query-field.directive";
import { QueryEntityDirective } from "./query-entity.directive";
import { QuerySwitchGroupDirective } from "./query-switch-group.directive";
import { QueryButtonGroupDirective } from "./query-button-group.directive";
import { QueryInputDirective } from "./query-input.directive";
import { QueryRemoveButtonDirective } from "./query-remove-button.directive";
import { QueryEmptyWarningDirective } from "./query-empty-warning.directive";
import { QueryArrowIconDirective } from "./query-arrow-icon.directive";
import { Component, ContentChild, ContentChildren, forwardRef, Input, ViewChild, } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@ng-select/ng-select";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export const CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QueryBuilderComponent),
    multi: true,
};
export const VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => QueryBuilderComponent),
    multi: true,
};
export class QueryBuilderComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.defaultClassNames = {
            arrowIconButton: "q-arrow-icon-button",
            arrowIcon: "q-icon q-arrow-icon",
            removeIcon: "q-icon q-remove-icon",
            addIcon: "q-icon q-add-icon",
            button: "q-button",
            buttonGroup: "q-button-group",
            removeButton: "q-remove-button",
            switchGroup: "q-switch-group",
            switchLabel: "q-switch-label",
            switchRadio: "q-switch-radio",
            rightAlign: "q-right-align",
            transition: "q-transition",
            collapsed: "q-collapsed",
            treeContainer: "q-tree-container",
            tree: "q-tree",
            row: "q-row",
            connector: "q-connector",
            rule: "q-rule",
            ruleSet: "q-ruleset",
            invalidRuleSet: "q-invalid-ruleset",
            emptyWarning: "q-empty-warning",
            fieldControl: "q-field-control",
            fieldControlSize: "q-control-size",
            entityControl: "q-entity-control",
            entityControlSize: "q-control-size",
            operatorControl: "q-operator-control",
            operatorControlSize: "q-control-size",
            inputControl: "q-input-control",
            inputControlSize: "q-control-size",
        };
        this.defaultOperatorMap = {
            string: ["=", "!=", "contains", "like"],
            number: ["=", "!=", ">", ">=", "<", "<="],
            time: ["=", "!=", ">", ">=", "<", "<="],
            date: ["=", "!=", ">", ">=", "<", "<="],
            category: ["=", "!=", "in", "not in"],
            boolean: ["="],
        };
        this.disabled = false;
        this.data = { condition: "add", rules: [] };
        this.allowRuleset = true;
        this.allowCollapse = false;
        this.emptyMessage = "A ruleset cannot be empty. Please add a rule or remove it all together.";
        this.classNames = {};
        this.operatorMap = {};
        this.parentValue = { condition: "add", rules: [] };
        this.config = { fields: {} };
        this.persistValueOnFieldChange = false;
        this.defaultTemplateTypes = [
            "string",
            "number",
            "time",
            "date",
            "category",
            "boolean",
            "multiselect",
        ];
        this.defaultPersistValueTypes = [
            "string",
            "number",
            "time",
            "date",
            "boolean",
        ];
        this.defaultEmptyList = [];
        this.operatorsCache = {};
        this.inputContextCache = new Map();
        this.operatorContextCache = new Map();
        this.fieldContextCache = new Map();
        this.entityContextCache = new Map();
        this.removeButtonContextCache = new Map();
        // ----------END----------
        this.getDisabledState = () => {
            return this.disabled;
        };
        this.fields = [];
        this.filterFields = [];
        this.entities = [];
    }
    // ----------OnInit Implementation----------
    // ----------OnChanges Implementation----------
    ngOnChanges(changes) {
        const config = this.config;
        const type = typeof config;
        if (type === "object") {
            this.fields = Object.keys(config.fields).map((value) => {
                const field = config.fields[value];
                field.value = field.value || value;
                return field;
            });
            if (config.entities) {
                this.entities = Object.keys(config.entities).map((value) => {
                    const entity = config.entities ? config.entities[value] : [];
                    entity.value = entity.value || value;
                    return entity;
                });
            }
            else {
                this.entities = [];
            }
            this.operatorsCache = {};
        }
        else {
            throw new Error(`Expected 'config' must be a valid object, got ${type} instead.`);
        }
    }
    // ----------Validator Implementation----------
    validate(control) {
        const errors = {};
        const ruleErrorStore = [];
        let hasErrors = false;
        if (!this.config.allowEmptyRulesets &&
            this.checkEmptyRuleInRuleset(this.data)) {
            errors['empty'] = "Empty rulesets are not allowed.";
            hasErrors = true;
        }
        this.validateRulesInRuleset(this.data, ruleErrorStore);
        if (ruleErrorStore.length) {
            errors['rules'] = ruleErrorStore;
            hasErrors = true;
        }
        return hasErrors ? errors : null;
    }
    // ----------ControlValueAccessor Implementation----------
    get value() {
        return this.data;
    }
    set value(value) {
        if (value) {
            for (let rule of value.rules) {
                rule.tempField = rule.field;
            }
        }
        // When component is initialized without a formControl, null is passed to value
        this.data = value || { condition: "add", rules: [] };
        this.handleDataChange();
    }
    writeValue(obj) {
        this.value = obj;
    }
    registerOnChange(fn) {
        this.onChangeCallback = () => fn(this.data);
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = () => fn(this.data);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetectorRef.detectChanges();
    }
    findTemplateForRule(rule) {
        const type = this.getInputType(rule.field, rule.operator);
        if (type) {
            const queryInput = this.findQueryInput(type);
            if (queryInput) {
                return queryInput.template;
            }
            else {
                if (this.defaultTemplateTypes.indexOf(type) === -1) {
                    console.warn(`Could not find template for field with type: ${type}`);
                }
                return null;
            }
        }
    }
    findQueryInput(type) {
        const templates = this.parentInputTemplates || this.inputTemplates;
        return templates.find((item) => item.queryInputType === type);
    }
    getOperators(field) {
        let tempField = JSON.parse(JSON.stringify(field));
        if (this.operatorsCache[tempField]) {
            return this.operatorsCache[tempField];
        }
        let operators = this.defaultEmptyList;
        const fieldObject = this.config.fields[tempField];
        if (this.config.getOperators) {
            return this.config.getOperators(tempField, fieldObject);
        }
        const type = fieldObject.type;
        if (fieldObject && fieldObject.operators) {
            operators = fieldObject.operators;
        }
        else if (type) {
            operators =
                (this.operatorMap && this.operatorMap[type]) ||
                    this.defaultOperatorMap[type] ||
                    this.defaultEmptyList;
            if (operators.length === 0) {
                console.warn(`No operators found for field '${field}' with type ${fieldObject.type}. ` +
                    `Please define an 'operators' property on the field or use the 'operatorMap' binding to fix this.`);
            }
            if (fieldObject.nullable) {
                operators = operators.concat(["is null", "is not null"]);
            }
        }
        else {
            console.warn(`No 'type' property found on field: '${field}'`);
        }
        // Cache reference to array object, so it won't be computed next time and trigger a rerender.
        this.operatorsCache[field] = operators;
        return operators;
    }
    getFields(entity) {
        if (this.entities.length && entity) {
            return this.fields.filter((field) => {
                return field && field.entity === entity;
            });
        }
        else {
            return this.fields;
        }
    }
    getInputType(field, operator) {
        if (this.config.getInputType) {
            return this.config.getInputType(field, operator);
        }
        if (!this.config.fields[field]) {
            throw new Error(`No configuration for field '${field}' could be found! Please add it to config.fields.`);
        }
        const type = this.config.fields[field].type;
        switch (operator) {
            case "is null":
            case "is not null":
                return null; // No displayed component
            case "in":
            case "not in":
                return type === "category" || type === "boolean" ? "multiselect" : type;
            default:
                return type;
        }
    }
    getOptions(field) {
        let tempField = JSON.parse(JSON.stringify(field));
        // tempField = tempField.slice(1,tempField.length-1);       //added
        if (this.config.getOptions) {
            return this.config.getOptions(tempField);
        }
        return this.config.fields[tempField].options || this.defaultEmptyList;
    }
    getClassNames(...args) {
        const clsLookup = this.classNames
            ? this.classNames
            : this.defaultClassNames;
        const defaultClassNames = this.defaultClassNames;
        const classNames = args
            .map((id) => clsLookup[id] || defaultClassNames[id])
            .filter((c) => !!c);
        return classNames.length ? classNames.join(" ") : [];
    }
    getDefaultField(entity) {
        if (!entity) {
            return null;
        }
        else if (entity.defaultField !== undefined) {
            return this.getDefaultValue(entity.defaultField);
        }
        else {
            const entityFields = this.fields.filter((field) => {
                return field && field.entity === entity.value;
            });
            if (entityFields && entityFields.length) {
                return entityFields[0];
            }
            else {
                console.warn(`No fields found for entity '${entity.name}'. ` +
                    `A 'defaultOperator' is also not specified on the field config. Operator value will default to null.`);
                return null;
            }
        }
    }
    getDefaultOperator(field) {
        if (field && field.defaultOperator !== undefined) {
            return this.getDefaultValue(field.defaultOperator);
        }
        else {
            const operators = this.getOperators(field.value);
            if (operators && operators.length) {
                return operators[0];
            }
            else {
                console.warn(`No operators found for field '${field.value}'. ` +
                    `A 'defaultOperator' is also not specified on the field config. Operator value will default to null.`);
                return null;
            }
        }
    }
    addRule(parent) {
        if (this.disabled) {
            return;
        }
        parent = parent || this.data;
        if (this.config.addRule) {
            this.config.addRule(parent);
        }
        else {
            let field = this.fields[0];
            parent.rules = parent.rules.concat([
                {
                    field: field.value,
                    operator: this.getDefaultOperator(field),
                    value: this.getDefaultValue(field.defaultValue),
                    entity: field.entity,
                },
            ]);
        }
        this.handleTouched();
        this.handleDataChange();
    }
    removeRule(rule, parent) {
        if (this.disabled) {
            return;
        }
        parent = parent || this.data;
        if (this.config.removeRule) {
            this.config.removeRule(rule, parent);
        }
        else {
            parent.rules = parent.rules.filter((r) => r !== rule);
        }
        this.inputContextCache.delete(rule);
        this.operatorContextCache.delete(rule);
        this.fieldContextCache.delete(rule);
        this.entityContextCache.delete(rule);
        this.removeButtonContextCache.delete(rule);
        this.handleTouched();
        this.handleDataChange();
    }
    addRuleSet(parent) {
        if (this.disabled) {
            return;
        }
        parent = parent || this.data;
        if (this.config.addRuleSet) {
            this.config.addRuleSet(parent);
        }
        else {
            parent.rules = parent.rules.concat([{ condition: "add", rules: [] }]);
        }
        this.handleTouched();
        this.handleDataChange();
    }
    removeRuleSet(ruleset, parent) {
        if (this.disabled) {
            return;
        }
        ruleset = ruleset || this.data;
        parent = parent || this.parentValue;
        if (this.config.removeRuleSet) {
            this.config.removeRuleSet(ruleset, parent);
        }
        else {
            parent.rules = parent.rules.filter((r) => r !== ruleset);
        }
        this.handleTouched();
        this.handleDataChange();
    }
    transitionEnd(e) {
        this.treeContainer.nativeElement.style.maxHeight = null;
    }
    toggleCollapse() {
        this.computedTreeContainerHeight();
        setTimeout(() => {
            this.data.collapsed = !this.data.collapsed;
        }, 100);
    }
    computedTreeContainerHeight() {
        const nativeElement = this.treeContainer.nativeElement;
        if (nativeElement && nativeElement.firstElementChild) {
            nativeElement.style.maxHeight =
                nativeElement.firstElementChild.clientHeight + 8 + "px";
        }
    }
    changeCondition(value) {
        if (this.disabled) {
            return;
        }
        this.data.condition = value;
        console.log(this.data);
        this.handleTouched();
        this.handleDataChange();
    }
    changeOperator(rule) {
        if (this.disabled) {
            return;
        }
        if (this.config.coerceValueForOperator) {
            rule.value = this.config.coerceValueForOperator(rule.operator, rule.value, rule);
        }
        else {
            rule.value = this.coerceValueForOperator(rule.operator, rule.value, rule);
        }
        this.handleTouched();
        this.handleDataChange();
    }
    coerceValueForOperator(operator, value, rule) {
        const inputType = this.getInputType(rule.field, operator);
        if (inputType === "multiselect" && !Array.isArray(value)) {
            return [value];
        }
        return value;
    }
    changeInput() {
        if (this.disabled) {
            return;
        }
        this.handleTouched();
        this.handleDataChange();
    }
    changeField(fieldValue, rule) {
        if (this.disabled || fieldValue == null) {
            return;
        }
        rule.field = JSON.parse(JSON.stringify(rule.tempField));
        const inputContext = this.inputContextCache.get(rule);
        const currentField = inputContext && inputContext.field;
        const nextField = this.config.fields[fieldValue];
        const nextValue = this.calculateFieldChangeValue(currentField, nextField, rule.value);
        if (nextValue !== undefined) {
            rule.value = nextValue;
        }
        else {
            delete rule.value;
        }
        rule.operator = this.getDefaultOperator(nextField);
        // Create new context objects so templates will automatically update
        this.inputContextCache.delete(rule);
        this.operatorContextCache.delete(rule);
        this.fieldContextCache.delete(rule);
        this.entityContextCache.delete(rule);
        this.getInputContext(rule);
        this.getFieldContext(rule);
        this.getOperatorContext(rule);
        this.getEntityContext(rule);
        this.handleTouched();
        this.handleDataChange();
    }
    changeEntity(entityValue, rule, index, data) {
        if (this.disabled) {
            return;
        }
        let i = index;
        let rs = data;
        const entity = this.entities.find((e) => e.value === entityValue);
        const defaultField = this.getDefaultField(entity);
        if (!rs) {
            rs = this.data;
            i = rs.rules.findIndex((x) => x === rule);
        }
        rule.field = defaultField.value;
        rs.rules[i] = rule;
        if (defaultField) {
            this.changeField(defaultField.value, rule);
        }
        else {
            this.handleTouched();
            this.handleDataChange();
        }
    }
    getDefaultValue(defaultValue) {
        switch (typeof defaultValue) {
            case "function":
                return defaultValue();
            default:
                return defaultValue;
        }
    }
    getOperatorTemplate() {
        const t = this.parentOperatorTemplate || this.operatorTemplate;
        return t ? t.template : null;
    }
    getFieldTemplate() {
        const t = this.parentFieldTemplate || this.fieldTemplate;
        return t ? t.template : null;
    }
    getEntityTemplate() {
        const t = this.parentEntityTemplate || this.entityTemplate;
        return t ? t.template : null;
    }
    getArrowIconTemplate() {
        const t = this.parentArrowIconTemplate || this.arrowIconTemplate;
        return t ? t.template : null;
    }
    getButtonGroupTemplate() {
        const t = this.parentButtonGroupTemplate || this.buttonGroupTemplate;
        return t ? t.template : null;
    }
    getSwitchGroupTemplate() {
        const t = this.parentSwitchGroupTemplate || this.switchGroupTemplate;
        return t ? t.template : null;
    }
    getRemoveButtonTemplate() {
        const t = this.parentRemoveButtonTemplate || this.removeButtonTemplate;
        return t ? t.template : null;
    }
    getEmptyWarningTemplate() {
        const t = this.parentEmptyWarningTemplate || this.emptyWarningTemplate;
        return t ? t.template : null;
    }
    getQueryItemClassName(local) {
        let cls = this.getClassNames("row", "connector", "transition");
        cls += " " + this.getClassNames(local.ruleset ? "ruleSet" : "rule");
        if (local.invalid) {
            cls += " " + this.getClassNames("invalidRuleSet");
        }
        return cls;
    }
    getButtonGroupContext() {
        if (!this.buttonGroupContext) {
            this.buttonGroupContext = {
                addRule: this.addRule.bind(this),
                addRuleSet: this.allowRuleset && this.addRuleSet.bind(this),
                removeRuleSet: this.allowRuleset &&
                    this.parentValue &&
                    this.removeRuleSet.bind(this),
                getDisabledState: this.getDisabledState,
                $implicit: this.data,
            };
        }
        return this.buttonGroupContext;
    }
    getRemoveButtonContext(rule) {
        if (!this.removeButtonContextCache.has(rule)) {
            this.removeButtonContextCache.set(rule, {
                removeRule: this.removeRule.bind(this),
                getDisabledState: this.getDisabledState,
                $implicit: rule,
            });
        }
        return this.removeButtonContextCache.get(rule);
    }
    getFieldContext(rule) {
        if (!this.fieldContextCache.has(rule)) {
            this.fieldContextCache.set(rule, {
                onChange: this.changeField.bind(this),
                getFields: this.getFields.bind(this),
                getDisabledState: this.getDisabledState,
                fields: this.fields,
                $implicit: rule,
            });
        }
        return this.fieldContextCache.get(rule);
    }
    getEntityContext(rule) {
        if (!this.entityContextCache.has(rule)) {
            this.entityContextCache.set(rule, {
                onChange: this.changeEntity.bind(this),
                getDisabledState: this.getDisabledState,
                entities: this.entities,
                $implicit: rule,
            });
        }
        return this.entityContextCache.get(rule);
    }
    getSwitchGroupContext() {
        return {
            onChange: this.changeCondition.bind(this),
            getDisabledState: this.getDisabledState,
            $implicit: this.data,
        };
    }
    getArrowIconContext() {
        return {
            getDisabledState: this.getDisabledState,
            $implicit: this.data,
        };
    }
    getEmptyWarningContext() {
        return {
            getDisabledState: this.getDisabledState,
            message: this.emptyMessage,
            $implicit: this.data,
        };
    }
    getOperatorContext(rule) {
        if (!this.operatorContextCache.has(rule)) {
            this.operatorContextCache.set(rule, {
                onChange: this.changeOperator.bind(this),
                getDisabledState: this.getDisabledState,
                operators: this.getOperators(rule.field),
                $implicit: rule,
            });
        }
        return this.operatorContextCache.get(rule);
    }
    getInputContext(rule) {
        if (!this.inputContextCache.has(rule)) {
            this.inputContextCache.set(rule, {
                onChange: this.changeInput.bind(this),
                getDisabledState: this.getDisabledState,
                options: this.getOptions(rule.field),
                field: this.config.fields[rule.field],
                $implicit: rule,
            });
        }
        return this.inputContextCache.get(rule);
    }
    calculateFieldChangeValue(currentField, nextField, currentValue) {
        if (this.config.calculateFieldChangeValue != null) {
            return this.config.calculateFieldChangeValue(currentField, nextField, currentValue);
        }
        const canKeepValue = () => {
            if (currentField == null || nextField == null) {
                return false;
            }
            return (currentField.type === nextField.type &&
                this.defaultPersistValueTypes.indexOf(currentField.type) !== -1);
        };
        if (this.persistValueOnFieldChange && canKeepValue()) {
            return currentValue;
        }
        if (nextField && nextField.defaultValue !== undefined) {
            return this.getDefaultValue(nextField.defaultValue);
        }
        return undefined;
    }
    checkEmptyRuleInRuleset(ruleset) {
        if (!ruleset || !ruleset.rules || ruleset.rules.length === 0) {
            return true;
        }
        else {
            return ruleset.rules.some((item) => {
                if (item.rules) {
                    return this.checkEmptyRuleInRuleset(item);
                }
                else {
                    return false;
                }
            });
        }
    }
    validateRulesInRuleset(ruleset, errorStore) {
        if (ruleset && ruleset.rules && ruleset.rules.length > 0) {
            ruleset.rules.forEach((item) => {
                if (item.rules) {
                    return this.validateRulesInRuleset(item, errorStore);
                }
                else if (item.field) {
                    const field = this.config.fields[item.field];
                    if (field && field.validator && field.validator.apply) {
                        const error = field.validator(item, ruleset);
                        if (error != null) {
                            errorStore.push(error);
                        }
                    }
                }
            });
        }
    }
    handleDataChange() {
        this.changeDetectorRef.markForCheck();
        if (this.onChangeCallback) {
            this.onChangeCallback();
        }
        if (this.parentChangeCallback) {
            this.parentChangeCallback();
        }
    }
    handleTouched() {
        if (this.onTouchedCallback) {
            this.onTouchedCallback();
        }
        if (this.parentTouchedCallback) {
            this.parentTouchedCallback();
        }
    }
}
QueryBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryBuilderComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
QueryBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: QueryBuilderComponent, selector: "query-builder", inputs: { disabled: "disabled", data: "data", allowRuleset: "allowRuleset", allowCollapse: "allowCollapse", emptyMessage: "emptyMessage", classNames: "classNames", operatorMap: "operatorMap", parentValue: "parentValue", config: "config", parentArrowIconTemplate: "parentArrowIconTemplate", parentInputTemplates: "parentInputTemplates", parentOperatorTemplate: "parentOperatorTemplate", parentFieldTemplate: "parentFieldTemplate", parentEntityTemplate: "parentEntityTemplate", parentSwitchGroupTemplate: "parentSwitchGroupTemplate", parentButtonGroupTemplate: "parentButtonGroupTemplate", parentRemoveButtonTemplate: "parentRemoveButtonTemplate", parentEmptyWarningTemplate: "parentEmptyWarningTemplate", parentChangeCallback: "parentChangeCallback", parentTouchedCallback: "parentTouchedCallback", persistValueOnFieldChange: "persistValueOnFieldChange", value: "value" }, providers: [CONTROL_VALUE_ACCESSOR, VALIDATOR], queries: [{ propertyName: "buttonGroupTemplate", first: true, predicate: QueryButtonGroupDirective, descendants: true }, { propertyName: "switchGroupTemplate", first: true, predicate: QuerySwitchGroupDirective, descendants: true }, { propertyName: "fieldTemplate", first: true, predicate: QueryFieldDirective, descendants: true }, { propertyName: "entityTemplate", first: true, predicate: QueryEntityDirective, descendants: true }, { propertyName: "operatorTemplate", first: true, predicate: QueryOperatorDirective, descendants: true }, { propertyName: "removeButtonTemplate", first: true, predicate: QueryRemoveButtonDirective, descendants: true }, { propertyName: "emptyWarningTemplate", first: true, predicate: QueryEmptyWarningDirective, descendants: true }, { propertyName: "arrowIconTemplate", first: true, predicate: QueryArrowIconDirective, descendants: true }, { propertyName: "inputTemplates", predicate: QueryInputDirective }], viewQueries: [{ propertyName: "treeContainer", first: true, predicate: ["treeContainer"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngClass]=\"getClassNames('switchRow')\">\n  <ng-template #defaultArrowIcon>\n    <em [ngClass]=\"getClassNames('arrowIcon')\"></em>\n  </ng-template>\n\n  <a\n    *ngIf=\"allowCollapse\"\n    (click)=\"toggleCollapse()\"\n    [ngClass]=\"\n      getClassNames('arrowIconButton', data.collapsed ? 'collapsed' : '')\n    \"\n  >\n    <ng-container\n      *ngIf=\"getArrowIconTemplate() as template; else defaultArrowIcon\"\n    >\n      <ng-container\n        *ngTemplateOutlet=\"template; context: getArrowIconContext()\"\n      ></ng-container>\n    </ng-container>\n  </a>\n\n  <ng-container\n    *ngIf=\"getButtonGroupTemplate() as template; else defaultButtonGroup\"\n  >\n    <div [ngClass]=\"getClassNames('buttonGroup', 'rightAlign')\">\n      <ng-container\n        *ngTemplateOutlet=\"template; context: getButtonGroupContext()\"\n      ></ng-container>\n    </div>\n  </ng-container>\n\n  <ng-template #defaultButtonGroup>\n    <div [ngClass]=\"getClassNames('buttonGroup', 'rightAlign')\">\n      <button\n        type=\"button\"\n        (click)=\"addRule()\"\n        [ngClass]=\"getClassNames('button')\"\n        [disabled]=\"disabled\"\n      >\n        <em [ngClass]=\"getClassNames('addIcon')\"></em> Rule\n      </button>\n      <button\n        type=\"button\"\n        (click)=\"addRuleSet()\"\n        [ngClass]=\"getClassNames('button')\"\n        *ngIf=\"allowRuleset\"\n        [disabled]=\"disabled\"\n      >\n        <em [ngClass]=\"getClassNames('addIcon')\"></em> Ruleset\n      </button>\n      <ng-container *ngIf=\"!!parentValue && allowRuleset\">\n        <button\n          type=\"button\"\n          (click)=\"removeRuleSet()\"\n          [ngClass]=\"getClassNames('button', 'removeButton')\"\n          [disabled]=\"disabled\"\n        >\n          Remove\n          <em [ngClass]=\"getClassNames('removeIcon')\"></em>\n        </button>\n      </ng-container>\n    </div>\n  </ng-template>\n\n  <ng-container\n    *ngIf=\"getSwitchGroupTemplate() as template; else defaultSwitchGroup\"\n  >\n    <ng-container\n      *ngTemplateOutlet=\"template; context: getSwitchGroupContext()\"\n    ></ng-container>\n  </ng-container>\n\n  <ng-template #defaultSwitchGroup>\n    <div [ngClass]=\"getClassNames('switchGroup', 'transition')\" *ngIf=\"data\">\n      <div [ngClass]=\"getClassNames('switchControl')\">\n        <input\n          type=\"radio\"\n          [ngClass]=\"getClassNames('switchRadio')\"\n          [(ngModel)]=\"data.condition\"\n          [disabled]=\"disabled\"\n          (click)=\"changeCondition(andOption.value)\"\n          value=\"and\"\n          #andOption\n        />\n        <label\n          (click)=\"changeCondition(andOption.value)\"\n          [ngClass]=\"getClassNames('switchLabel')\"\n          >AND</label\n        >\n      </div>\n      <div [ngClass]=\"getClassNames('switchControl')\">\n        <input\n          type=\"radio\"\n          [ngClass]=\"getClassNames('switchRadio')\"\n          [(ngModel)]=\"data.condition\"\n          (click)=\"changeCondition(orOption.value)\"\n          [disabled]=\"disabled\"\n          value=\"or\"\n          #orOption\n        />\n        <label\n          (click)=\"changeCondition(orOption.value)\"\n          [ngClass]=\"getClassNames('switchLabel')\"\n          >OR</label\n        >\n      </div>\n    </div>\n  </ng-template>\n</div>\n\n<div\n  #treeContainer\n  (transitionend)=\"transitionEnd($event)\"\n  [ngClass]=\"getClassNames('treeContainer', data.collapsed ? 'collapsed' : '')\"\n>\n  <ul [ngClass]=\"getClassNames('tree')\" *ngIf=\"data && data.rules\">\n    <ng-container *ngFor=\"let rule of data.rules; let i = index\">\n      <ng-container\n        *ngIf=\"{\n          ruleset: !!rule.rules,\n          invalid:\n            !config.allowEmptyRulesets && rule.rules && rule.rules.length === 0\n        } as local\"\n      >\n        <li class=\"rule\" [ngClass]=\"getQueryItemClassName(local)\">\n          <ng-container *ngIf=\"!local.ruleset\">\n            <ng-container\n              *ngIf=\"\n                getRemoveButtonTemplate() as template;\n                else defaultRemoveButton\n              \"\n            >\n              <div [ngClass]=\"getClassNames('buttonGroup', 'rightAlign')\">\n                <ng-container\n                  *ngTemplateOutlet=\"\n                    template;\n                    context: getRemoveButtonContext(rule)\n                  \"\n                ></ng-container>\n              </div>\n            </ng-container>\n\n            <ng-template #defaultRemoveButton>\n              <div [ngClass]=\"getClassNames('removeButtonSize', 'rightAlign')\">\n                <button\n                  type=\"button\"\n                  [ngClass]=\"getClassNames('button', 'removeButton')\"\n                  (click)=\"removeRule(rule, data)\"\n                  [disabled]=\"disabled\"\n                >\n                  Remove rule\n                  <em [ngClass]=\"getClassNames('removeIcon')\"></em>\n                </button>\n              </div>\n            </ng-template>\n\n            <div *ngIf=\"entities?.length\" class=\"q-inline-block-display\">\n              <ng-container\n                *ngIf=\"getEntityTemplate() as template; else defaultEntity\"\n              >\n                <ng-container\n                  *ngTemplateOutlet=\"template; context: getEntityContext(rule)\"\n                ></ng-container>\n              </ng-container>\n            </div>\n\n            <ng-template #defaultEntity>\n              <div [ngClass]=\"getClassNames('entityControlSize')\">\n                <select\n                  [ngClass]=\"getClassNames('entityControl')\"\n                  [(ngModel)]=\"rule.entity\"\n                  (ngModelChange)=\"changeEntity($event, rule, i, data)\"\n                  [disabled]=\"disabled\"\n                >\n                  <!-- <option *ngFor=\"let entity of entities\" [ngValue]=\"entity.value\"> -->\n                  <!-- {{entity.name}} -->\n                  <!-- </option> -->\n                </select>\n              </div>\n            </ng-template>\n\n            <ng-container\n              *ngIf=\"getFieldTemplate() as template; else defaultField\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getFieldContext(rule)\"\n              ></ng-container>\n            </ng-container>\n\n            <ng-template #defaultField>\n              <div [ngClass]=\"getClassNames('fieldControlSize')\">\n                <ng-select\n                  [(ngModel)]=\"rule.tempField\"\n                  [ngClass]=\"getClassNames('fieldControl')\"\n                  (change)=\"changeField($event, rule)\"\n                  [disabled]=\"disabled\"\n                >\n                  <ng-option\n                    *ngFor=\"let field of getFields(rule.entity)\"\n                    [value]=\"field.value\"\n                  >\n                    {{ field.name }}\n                  </ng-option>\n                </ng-select>\n              </div>\n            </ng-template>\n\n            <ng-container\n              *ngIf=\"getOperatorTemplate() as template; else defaultOperator\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getOperatorContext(rule)\"\n              ></ng-container>\n            </ng-container>\n\n            <ng-template #defaultOperator>\n              <div [ngClass]=\"getClassNames('operatorControlSize')\">\n                <select\n                  [ngClass]=\"getClassNames('operatorControl')\"\n                  [(ngModel)]=\"rule.operator\"\n                  (ngModelChange)=\"changeOperator(rule)\"\n                  [disabled]=\"disabled\"\n                >\n                  <option\n                    *ngFor=\"let operator of getOperators(rule.field)\"\n                    [ngValue]=\"operator\"\n                  >\n                    {{ operator }}\n                  </option>\n                </select>\n              </div>\n            </ng-template>\n\n            <ng-container\n              *ngIf=\"findTemplateForRule(rule) as template; else defaultInput\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getInputContext(rule)\"\n              ></ng-container>\n            </ng-container>\n\n            <ng-template #defaultInput>\n              <div\n                [ngClass]=\"getClassNames('inputControlSize')\"\n                [ngSwitch]=\"getInputType(rule.field, rule.operator)\"\n              >\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'string'\"\n                  type=\"text\"\n                />\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'number'\"\n                  type=\"number\"\n                />\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'date'\"\n                  type=\"date\"\n                />\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'time'\"\n                  type=\"time\"\n                />\n                <select\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'category'\"\n                >\n                  <option\n                    *ngFor=\"let opt of getOptions(rule.field)\"\n                    [ngValue]=\"opt.value\"\n                  >\n                    {{ opt.name }}\n                  </option>\n                </select>\n                <ng-container *ngSwitchCase=\"'multiselect'\">\n                  <select\n                    [ngClass]=\"getClassNames('inputControl')\"\n                    [(ngModel)]=\"rule.value\"\n                    (ngModelChange)=\"changeInput()\"\n                    [disabled]=\"disabled\"\n                    multiple\n                  >\n                    <option\n                      *ngFor=\"let opt of getOptions(rule.field)\"\n                      [ngValue]=\"opt.value\"\n                    >\n                      {{ opt.name }}\n                    </option>\n                  </select>\n                </ng-container>\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'boolean'\"\n                  type=\"checkbox\"\n                />\n              </div>\n            </ng-template>\n          </ng-container>\n          <query-builder\n            *ngIf=\"local.ruleset\"\n            [data]=\"rule\"\n            [disabled]=\"disabled\"\n            [parentTouchedCallback]=\"parentTouchedCallback || onTouchedCallback\"\n            [parentChangeCallback]=\"parentChangeCallback || onChangeCallback\"\n            [parentInputTemplates]=\"parentInputTemplates || inputTemplates\"\n            [parentOperatorTemplate]=\"\n              parentOperatorTemplate || operatorTemplate\n            \"\n            [parentFieldTemplate]=\"parentFieldTemplate || fieldTemplate\"\n            [parentEntityTemplate]=\"parentEntityTemplate || entityTemplate\"\n            [parentSwitchGroupTemplate]=\"\n              parentSwitchGroupTemplate || switchGroupTemplate\n            \"\n            [parentButtonGroupTemplate]=\"\n              parentButtonGroupTemplate || buttonGroupTemplate\n            \"\n            [parentRemoveButtonTemplate]=\"\n              parentRemoveButtonTemplate || removeButtonTemplate\n            \"\n            [parentEmptyWarningTemplate]=\"\n              parentEmptyWarningTemplate || emptyWarningTemplate\n            \"\n            [parentArrowIconTemplate]=\"\n              parentArrowIconTemplate || arrowIconTemplate\n            \"\n            [parentValue]=\"data\"\n            [classNames]=\"classNames\"\n            [config]=\"config\"\n            [allowRuleset]=\"allowRuleset\"\n            [allowCollapse]=\"allowCollapse\"\n            [emptyMessage]=\"emptyMessage\"\n            [operatorMap]=\"operatorMap\"\n          >\n          </query-builder>\n\n          <ng-container\n            *ngIf=\"\n              getEmptyWarningTemplate() as template;\n              else defaultEmptyWarning\n            \"\n          >\n            <ng-container *ngIf=\"local.invalid\">\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getEmptyWarningContext()\"\n              ></ng-container>\n            </ng-container>\n          </ng-container>\n\n          <ng-template #defaultEmptyWarning>\n            <p [ngClass]=\"getClassNames('emptyWarning')\" *ngIf=\"local.invalid\">\n              {{ emptyMessage }}\n            </p>\n          </ng-template>\n        </li>\n      </ng-container>\n    </ng-container>\n  </ul>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host .q-icon{font-style:normal;font-size:12px}:host .q-remove-icon:before{content:\"\\274c\"}:host .q-arrow-icon-button{float:left;margin:4px 6px 4px 0;transform:rotate(90deg);transition:linear .25s transform;cursor:pointer}:host .q-arrow-icon-button.q-collapsed{transform:rotate(0)}:host .q-arrow-icon:before{content:\"\\25b6\"}:host .q-add-icon{color:#555}:host .q-add-icon:before{content:\"\\2795\"}:host .q-remove-button{color:#b3415d;width:31px}:host .q-switch-group,:host .q-button-group{font-family:\"Lucida Grande\",Tahoma,Verdana,sans-serif;overflow:hidden}:host .q-right-align{float:right}:host .q-button{margin-left:8px;padding:0 8px;background-color:#fff}:host .q-button:disabled{display:none}:host .q-control-size{display:inline-block;vertical-align:top;padding-right:10px}:host .q-input-control,:host .q-operator-control,:host .q-field-control,:host .q-entity-control{display:inline-block;padding:5px 8px;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;width:auto;min-width:180px}:host .q-input-control:disabled,:host .q-operator-control:disabled,:host .q-field-control:disabled,:host .q-entity-control:disabled{border-color:transparent}:host .q-operator-control,:host .q-field-control,:host .q-entity-control,:host .q-input-control:not([type=checkbox]){min-height:32px;-webkit-appearance:none}:host .q-switch-label,:host .q-button{float:left;margin-bottom:0;font-size:14px;line-height:30px;font-weight:normal;text-align:center;text-shadow:none;border:1px solid rgba(0,0,0,.2);box-sizing:border-box}:host .q-switch-label:hover,:host .q-button:hover{cursor:pointer;background-color:#f0f0f0}:host .q-switch-label{background-color:#e4e4e4;padding:0 8px}:host .q-switch-radio{position:absolute;clip:rect(0,0,0,0);height:1px;width:1px;border:0;overflow:hidden}:host .q-switch-radio:checked+.q-switch-label{border:1px solid #619ed7;background:white;color:#3176b3}:host .q-switch-radio:disabled+.q-switch-label{display:none}:host .q-switch-radio:checked:disabled+.q-switch-label{display:initial;color:initial;cursor:default;border-color:transparent}:host .q-invalid-ruleset{border:1px solid rgba(179,65,93,.5)!important;background:rgba(179,65,93,.1)!important}:host .q-empty-warning{color:#8d252e;text-align:center}:host .q-ruleset{border:1px solid #ccc}:host .q-rule{border:1px solid #ccc;background:white}:host .q-transition{transition:all .1s ease-in-out}:host .q-tree-container{width:100%;overflow:hidden;transition:ease-in .25s max-height}:host .q-tree-container.q-collapsed{max-height:0!important}:host .q-tree{list-style:none;margin:4px 0 2px}:host .q-row{padding:6px 8px;margin-top:6px}:host .q-connector{position:relative}:host .q-connector:before{top:-5px;border-width:0 0 2px 2px}:host .q-connector:after{border-width:0 0 0 2px;top:50%}:host .q-connector:before,:host .q-connector:after{content:\"\";left:-12px;border-color:#ccc;border-style:solid;width:9px;height:calc(50% + 6px);position:absolute}:host .q-connector:last-child:after{content:none}:host .q-inline-block-display{display:inline-block;vertical-align:top}:host .q-tree-container{overflow:visible!important}\n"], components: [{ type: i1.NgSelectComponent, selector: "ng-select", inputs: ["markFirst", "dropdownPosition", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "bufferAmount", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd", "bindLabel", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "virtualScroll", "openOnEnter", "appendTo", "bindValue", "appearance", "maxSelectedItems", "groupBy", "groupValue", "tabIndex", "typeahead"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { type: i1.ɵr, selector: "ng-option", inputs: ["disabled", "value"] }, { type: QueryBuilderComponent, selector: "query-builder", inputs: ["disabled", "data", "allowRuleset", "allowCollapse", "emptyMessage", "classNames", "operatorMap", "parentValue", "config", "parentArrowIconTemplate", "parentInputTemplates", "parentOperatorTemplate", "parentFieldTemplate", "parentEntityTemplate", "parentSwitchGroupTemplate", "parentButtonGroupTemplate", "parentRemoveButtonTemplate", "parentEmptyWarningTemplate", "parentChangeCallback", "parentTouchedCallback", "persistValueOnFieldChange", "value"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i3.SelectMultipleControlValueAccessor, selector: "select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]", inputs: ["compareWith"] }, { type: i3.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryBuilderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "query-builder",
                    templateUrl: "./query-builder.component.html",
                    styleUrls: ["./query-builder.component.scss"],
                    providers: [CONTROL_VALUE_ACCESSOR, VALIDATOR],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], data: [{
                type: Input
            }], allowRuleset: [{
                type: Input
            }], allowCollapse: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], classNames: [{
                type: Input
            }], operatorMap: [{
                type: Input
            }], parentValue: [{
                type: Input
            }], config: [{
                type: Input
            }], parentArrowIconTemplate: [{
                type: Input
            }], parentInputTemplates: [{
                type: Input
            }], parentOperatorTemplate: [{
                type: Input
            }], parentFieldTemplate: [{
                type: Input
            }], parentEntityTemplate: [{
                type: Input
            }], parentSwitchGroupTemplate: [{
                type: Input
            }], parentButtonGroupTemplate: [{
                type: Input
            }], parentRemoveButtonTemplate: [{
                type: Input
            }], parentEmptyWarningTemplate: [{
                type: Input
            }], parentChangeCallback: [{
                type: Input
            }], parentTouchedCallback: [{
                type: Input
            }], persistValueOnFieldChange: [{
                type: Input
            }], treeContainer: [{
                type: ViewChild,
                args: ["treeContainer", { static: true }]
            }], buttonGroupTemplate: [{
                type: ContentChild,
                args: [QueryButtonGroupDirective]
            }], switchGroupTemplate: [{
                type: ContentChild,
                args: [QuerySwitchGroupDirective]
            }], fieldTemplate: [{
                type: ContentChild,
                args: [QueryFieldDirective]
            }], entityTemplate: [{
                type: ContentChild,
                args: [QueryEntityDirective]
            }], operatorTemplate: [{
                type: ContentChild,
                args: [QueryOperatorDirective]
            }], removeButtonTemplate: [{
                type: ContentChild,
                args: [QueryRemoveButtonDirective]
            }], emptyWarningTemplate: [{
                type: ContentChild,
                args: [QueryEmptyWarningDirective]
            }], inputTemplates: [{
                type: ContentChildren,
                args: [QueryInputDirective]
            }], arrowIconTemplate: [{
                type: ContentChild,
                args: [QueryArrowIconDirective]
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1xdWVyeS1idWlsZGVyL3NyYy9saWIvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXF1ZXJ5LWJ1aWxkZXIvc3JjL2xpYi9xdWVyeS1idWlsZGVyL3F1ZXJ5LWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLGlCQUFpQixFQUNqQixhQUFhLEdBR2QsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQW9CdkUsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBTUwsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDOzs7OztBQUV2QixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBUTtJQUN6QyxPQUFPLEVB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ICBBYnN0cmFjdENvbnRyb2wsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgTkdfVkFMSURBVE9SUyxcbiAgVmFsaWRhdGlvbkVycm9ycyxcbiAgVmFsaWRhdG9yLFxufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFF1ZXJ5T3BlcmF0b3JEaXJlY3RpdmUgfSBmcm9tIFwiLi9xdWVyeS1vcGVyYXRvci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IFF1ZXJ5RmllbGREaXJlY3RpdmUgfSBmcm9tIFwiLi9xdWVyeS1maWVsZC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IFF1ZXJ5RW50aXR5RGlyZWN0aXZlIH0gZnJvbSBcIi4vcXVlcnktZW50aXR5LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgUXVlcnlTd2l0Y2hHcm91cERpcmVjdGl2ZSB9IGZyb20gXCIuL3F1ZXJ5LXN3aXRjaC1ncm91cC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IFF1ZXJ5QnV0dG9uR3JvdXBEaXJlY3RpdmUgfSBmcm9tIFwiLi9xdWVyeS1idXR0b24tZ3JvdXAuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBRdWVyeUlucHV0RGlyZWN0aXZlIH0gZnJvbSBcIi4vcXVlcnktaW5wdXQuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBRdWVyeVJlbW92ZUJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gXCIuL3F1ZXJ5LXJlbW92ZS1idXR0b24uZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBRdWVyeUVtcHR5V2FybmluZ0RpcmVjdGl2ZSB9IGZyb20gXCIuL3F1ZXJ5LWVtcHR5LXdhcm5pbmcuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBRdWVyeUFycm93SWNvbkRpcmVjdGl2ZSB9IGZyb20gXCIuL3F1ZXJ5LWFycm93LWljb24uZGlyZWN0aXZlXCI7XG5pbXBvcnQge1xuICBCdXR0b25Hcm91cENvbnRleHQsXG4gIEVudGl0eSxcbiAgRmllbGQsXG4gIFN3aXRjaEdyb3VwQ29udGV4dCxcbiAgRW50aXR5Q29udGV4dCxcbiAgRmllbGRDb250ZXh0LFxuICBJbnB1dENvbnRleHQsXG4gIExvY2FsUnVsZU1ldGEsXG4gIE9wZXJhdG9yQ29udGV4dCxcbiAgT3B0aW9uLFxuICBRdWVyeUJ1aWxkZXJDbGFzc05hbWVzLFxuICBRdWVyeUJ1aWxkZXJDb25maWcsXG4gIFJlbW92ZUJ1dHRvbkNvbnRleHQsXG4gIEFycm93SWNvbkNvbnRleHQsXG4gIFJ1bGUsXG4gIFJ1bGVTZXQsXG4gIEVtcHR5V2FybmluZ0NvbnRleHQsXG59IGZyb20gXCIuL3F1ZXJ5LWJ1aWxkZXIuaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgY29uc3QgQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUXVlcnlCdWlsZGVyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5leHBvcnQgY29uc3QgVkFMSURBVE9SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFF1ZXJ5QnVpbGRlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInF1ZXJ5LWJ1aWxkZXJcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9xdWVyeS1idWlsZGVyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9xdWVyeS1idWlsZGVyLmNvbXBvbmVudC5zY3NzXCJdLFxuICBwcm92aWRlcnM6IFtDT05UUk9MX1ZBTFVFX0FDQ0VTU09SLCBWQUxJREFUT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVyeUJ1aWxkZXJDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3JcbntcbiAgcHVibGljIGZpZWxkczogRmllbGRbXTtcbiAgcHVibGljIGZpbHRlckZpZWxkczogRmllbGRbXTtcbiAgcHVibGljIGVudGl0aWVzOiBFbnRpdHlbXTtcbiAgcHVibGljIGRlZmF1bHRDbGFzc05hbWVzOiBRdWVyeUJ1aWxkZXJDbGFzc05hbWVzID0ge1xuICAgIGFycm93SWNvbkJ1dHRvbjogXCJxLWFycm93LWljb24tYnV0dG9uXCIsXG4gICAgYXJyb3dJY29uOiBcInEtaWNvbiBxLWFycm93LWljb25cIixcbiAgICByZW1vdmVJY29uOiBcInEtaWNvbiBxLXJlbW92ZS1pY29uXCIsXG4gICAgYWRkSWNvbjogXCJxLWljb24gcS1hZGQtaWNvblwiLFxuICAgIGJ1dHRvbjogXCJxLWJ1dHRvblwiLFxuICAgIGJ1dHRvbkdyb3VwOiBcInEtYnV0dG9uLWdyb3VwXCIsXG4gICAgcmVtb3ZlQnV0dG9uOiBcInEtcmVtb3ZlLWJ1dHRvblwiLFxuICAgIHN3aXRjaEdyb3VwOiBcInEtc3dpdGNoLWdyb3VwXCIsXG4gICAgc3dpdGNoTGFiZWw6IFwicS1zd2l0Y2gtbGFiZWxcIixcbiAgICBzd2l0Y2hSYWRpbzogXCJxLXN3aXRjaC1yYWRpb1wiLFxuICAgIHJpZ2h0QWxpZ246IFwicS1yaWdodC1hbGlnblwiLFxuICAgIHRyYW5zaXRpb246IFwicS10cmFuc2l0aW9uXCIsXG4gICAgY29sbGFwc2VkOiBcInEtY29sbGFwc2VkXCIsXG4gICAgdHJlZUNvbnRhaW5lcjogXCJxLXRyZWUtY29udGFpbmVyXCIsXG4gICAgdHJlZTogXCJxLXRyZWVcIixcbiAgICByb3c6IFwicS1yb3dcIixcbiAgICBjb25uZWN0b3I6IFwicS1jb25uZWN0b3JcIixcbiAgICBydWxlOiBcInEtcnVsZVwiLFxuICAgIHJ1bGVTZXQ6IFwicS1ydWxlc2V0XCIsXG4gICAgaW52YWxpZFJ1bGVTZXQ6IFwicS1pbnZhbGlkLXJ1bGVzZXRcIixcbiAgICBlbXB0eVdhcm5pbmc6IFwicS1lbXB0eS13YXJuaW5nXCIsXG4gICAgZmllbGRDb250cm9sOiBcInEtZmllbGQtY29udHJvbFwiLFxuICAgIGZpZWxkQ29udHJvbFNpemU6IFwicS1jb250cm9sLXNpemVcIixcbiAgICBlbnRpdHlDb250cm9sOiBcInEtZW50aXR5LWNvbnRyb2xcIixcbiAgICBlbnRpdHlDb250cm9sU2l6ZTogXCJxLWNvbnRyb2wtc2l6ZVwiLFxuICAgIG9wZXJhdG9yQ29udHJvbDogXCJxLW9wZXJhdG9yLWNvbnRyb2xcIixcbiAgICBvcGVyYXRvckNvbnRyb2xTaXplOiBcInEtY29udHJvbC1zaXplXCIsXG4gICAgaW5wdXRDb250cm9sOiBcInEtaW5wdXQtY29udHJvbFwiLFxuICAgIGlucHV0Q29udHJvbFNpemU6IFwicS1jb250cm9sLXNpemVcIixcbiAgfTtcbiAgcHVibGljIGRlZmF1bHRPcGVyYXRvck1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge1xuICAgIHN0cmluZzogW1wiPVwiLCBcIiE9XCIsIFwiY29udGFpbnNcIiwgXCJsaWtlXCJdLFxuICAgIG51bWJlcjogW1wiPVwiLCBcIiE9XCIsIFwiPlwiLCBcIj49XCIsIFwiPFwiLCBcIjw9XCJdLFxuICAgIHRpbWU6IFtcIj1cIiwgXCIhPVwiLCBcIj5cIiwgXCI+PVwiLCBcIjxcIiwgXCI8PVwiXSxcbiAgICBkYXRlOiBbXCI9XCIsIFwiIT1cIiwgXCI+XCIsIFwiPj1cIiwgXCI8XCIsIFwiPD1cIl0sXG4gICAgY2F0ZWdvcnk6IFtcIj1cIiwgXCIhPVwiLCBcImluXCIsIFwibm90IGluXCJdLFxuICAgIGJvb2xlYW46IFtcIj1cIl0sXG4gIH07XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRhdGE6IFJ1bGVTZXQgPSB7IGNvbmRpdGlvbjogXCJhZGRcIiwgcnVsZXM6IFtdIH07XG5cbiAgLy8gRm9yIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgb25DaGFuZ2VDYWxsYmFjayE6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBvblRvdWNoZWRDYWxsYmFjayE6ICgpID0+IGFueTtcblxuICBASW5wdXQoKSBhbGxvd1J1bGVzZXQgPSB0cnVlO1xuICBASW5wdXQoKSBhbGxvd0NvbGxhcHNlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVtcHR5TWVzc2FnZSA9XG4gICAgXCJBIHJ1bGVzZXQgY2Fubm90IGJlIGVtcHR5LiBQbGVhc2UgYWRkIGEgcnVsZSBvciByZW1vdmUgaXQgYWxsIHRvZ2V0aGVyLlwiO1xuICBASW5wdXQoKSBjbGFzc05hbWVzOiBRdWVyeUJ1aWxkZXJDbGFzc05hbWVzID0ge307XG4gIEBJbnB1dCgpIG9wZXJhdG9yTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcbiAgQElucHV0KCkgcGFyZW50VmFsdWU6IFJ1bGVTZXQgPSB7IGNvbmRpdGlvbjogXCJhZGRcIiwgcnVsZXM6IFtdIH07XG4gIEBJbnB1dCgpIGNvbmZpZzogUXVlcnlCdWlsZGVyQ29uZmlnID0geyBmaWVsZHM6IHt9IH07XG4gIEBJbnB1dCgpIHBhcmVudEFycm93SWNvblRlbXBsYXRlITogUXVlcnlBcnJvd0ljb25EaXJlY3RpdmU7XG4gIEBJbnB1dCgpIHBhcmVudElucHV0VGVtcGxhdGVzITogUXVlcnlMaXN0PFF1ZXJ5SW5wdXREaXJlY3RpdmU+O1xuICBASW5wdXQoKSBwYXJlbnRPcGVyYXRvclRlbXBsYXRlITogUXVlcnlPcGVyYXRvckRpcmVjdGl2ZTtcbiAgQElucHV0KCkgcGFyZW50RmllbGRUZW1wbGF0ZSE6IFF1ZXJ5RmllbGREaXJlY3RpdmU7XG4gIEBJbnB1dCgpIHBhcmVudEVudGl0eVRlbXBsYXRlITogUXVlcnlFbnRpdHlEaXJlY3RpdmU7XG4gIEBJbnB1dCgpIHBhcmVudFN3aXRjaEdyb3VwVGVtcGxhdGUhOiBRdWVyeVN3aXRjaEdyb3VwRGlyZWN0aXZlO1xuICBASW5wdXQoKSBwYXJlbnRCdXR0b25Hcm91cFRlbXBsYXRlITogUXVlcnlCdXR0b25Hcm91cERpcmVjdGl2ZTtcbiAgQElucHV0KCkgcGFyZW50UmVtb3ZlQnV0dG9uVGVtcGxhdGUhOiBRdWVyeVJlbW92ZUJ1dHRvbkRpcmVjdGl2ZTtcbiAgQElucHV0KCkgcGFyZW50RW1wdHlXYXJuaW5nVGVtcGxhdGUhOiBRdWVyeUVtcHR5V2FybmluZ0RpcmVjdGl2ZTtcbiAgQElucHV0KCkgcGFyZW50Q2hhbmdlQ2FsbGJhY2shOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKSBwYXJlbnRUb3VjaGVkQ2FsbGJhY2shOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKSBwZXJzaXN0VmFsdWVPbkZpZWxkQ2hhbmdlID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZChcInRyZWVDb250YWluZXJcIiwgeyBzdGF0aWM6IHRydWUgfSkgdHJlZUNvbnRhaW5lciE6IEVsZW1lbnRSZWY7XG5cbiAgQENvbnRlbnRDaGlsZChRdWVyeUJ1dHRvbkdyb3VwRGlyZWN0aXZlKVxuICBidXR0b25Hcm91cFRlbXBsYXRlITogUXVlcnlCdXR0b25Hcm91cERpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChRdWVyeVN3aXRjaEdyb3VwRGlyZWN0aXZlKVxuICBzd2l0Y2hHcm91cFRlbXBsYXRlITogUXVlcnlTd2l0Y2hHcm91cERpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChRdWVyeUZpZWxkRGlyZWN0aXZlKSBmaWVsZFRlbXBsYXRlITogUXVlcnlGaWVsZERpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChRdWVyeUVudGl0eURpcmVjdGl2ZSkgZW50aXR5VGVtcGxhdGUhOiBRdWVyeUVudGl0eURpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChRdWVyeU9wZXJhdG9yRGlyZWN0aXZlKVxuICBvcGVyYXRvclRlbXBsYXRlITogUXVlcnlPcGVyYXRvckRpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChRdWVyeVJlbW92ZUJ1dHRvbkRpcmVjdGl2ZSlcbiAgcmVtb3ZlQnV0dG9uVGVtcGxhdGUhOiBRdWVyeVJlbW92ZUJ1dHRvbkRpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChRdWVyeUVtcHR5V2FybmluZ0RpcmVjdGl2ZSlcbiAgZW1wdHlXYXJuaW5nVGVtcGxhdGUhOiBRdWVyeUVtcHR5V2FybmluZ0RpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZHJlbihRdWVyeUlucHV0RGlyZWN0aXZlKVxuICBpbnB1dFRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxRdWVyeUlucHV0RGlyZWN0aXZlPjtcbiAgQENvbnRlbnRDaGlsZChRdWVyeUFycm93SWNvbkRpcmVjdGl2ZSlcbiAgYXJyb3dJY29uVGVtcGxhdGUhOiBRdWVyeUFycm93SWNvbkRpcmVjdGl2ZTtcblxuICBwcml2YXRlIGRlZmF1bHRUZW1wbGF0ZVR5cGVzOiBzdHJpbmdbXSA9IFtcbiAgICBcInN0cmluZ1wiLFxuICAgIFwibnVtYmVyXCIsXG4gICAgXCJ0aW1lXCIsXG4gICAgXCJkYXRlXCIsXG4gICAgXCJjYXRlZ29yeVwiLFxuICAgIFwiYm9vbGVhblwiLFxuICAgIFwibXVsdGlzZWxlY3RcIixcbiAgXTtcbiAgcHJpdmF0ZSBkZWZhdWx0UGVyc2lzdFZhbHVlVHlwZXM6IHN0cmluZ1tdID0gW1xuICAgIFwic3RyaW5nXCIsXG4gICAgXCJudW1iZXJcIixcbiAgICBcInRpbWVcIixcbiAgICBcImRhdGVcIixcbiAgICBcImJvb2xlYW5cIixcbiAgXTtcbiAgcHJpdmF0ZSBkZWZhdWx0RW1wdHlMaXN0OiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIG9wZXJhdG9yc0NhY2hlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcbiAgcHJpdmF0ZSBpbnB1dENvbnRleHRDYWNoZSA9IG5ldyBNYXA8UnVsZSwgSW5wdXRDb250ZXh0PigpO1xuICBwcml2YXRlIG9wZXJhdG9yQ29udGV4dENhY2hlID0gbmV3IE1hcDxSdWxlLCBPcGVyYXRvckNvbnRleHQ+KCk7XG4gIHByaXZhdGUgZmllbGRDb250ZXh0Q2FjaGUgPSBuZXcgTWFwPFJ1bGUsIEZpZWxkQ29udGV4dD4oKTtcbiAgcHJpdmF0ZSBlbnRpdHlDb250ZXh0Q2FjaGUgPSBuZXcgTWFwPFJ1bGUsIEVudGl0eUNvbnRleHQ+KCk7XG4gIHByaXZhdGUgcmVtb3ZlQnV0dG9uQ29udGV4dENhY2hlID0gbmV3IE1hcDxSdWxlLCBSZW1vdmVCdXR0b25Db250ZXh0PigpO1xuICBwcml2YXRlIGJ1dHRvbkdyb3VwQ29udGV4dCE6IEJ1dHRvbkdyb3VwQ29udGV4dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZmllbGRzID0gW107XG4gICAgdGhpcy5maWx0ZXJGaWVsZHMgPSBbXTtcbiAgICB0aGlzLmVudGl0aWVzID0gW107XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tT25Jbml0IEltcGxlbWVudGF0aW9uLS0tLS0tLS0tLVxuXG4gIC8vIC0tLS0tLS0tLS1PbkNoYW5nZXMgSW1wbGVtZW50YXRpb24tLS0tLS0tLS0tXG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgY29uZmlnO1xuICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLmZpZWxkcyA9IE9iamVjdC5rZXlzKGNvbmZpZy5maWVsZHMpLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBjb25maWcuZmllbGRzW3ZhbHVlXTtcbiAgICAgICAgZmllbGQudmFsdWUgPSBmaWVsZC52YWx1ZSB8fCB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgICAgfSk7XG4gICAgICBpZiAoY29uZmlnLmVudGl0aWVzKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBPYmplY3Qua2V5cyhjb25maWcuZW50aXRpZXMpLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICBjb25zdCBlbnRpdHkgPSBjb25maWcuZW50aXRpZXMgPyBjb25maWcuZW50aXRpZXNbdmFsdWVdIDogKFtdIGFzIGFueSk7XG4gICAgICAgICAgZW50aXR5LnZhbHVlID0gZW50aXR5LnZhbHVlIHx8IHZhbHVlO1xuICAgICAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5vcGVyYXRvcnNDYWNoZSA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBFeHBlY3RlZCAnY29uZmlnJyBtdXN0IGJlIGEgdmFsaWQgb2JqZWN0LCBnb3QgJHt0eXBlfSBpbnN0ZWFkLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLS0tLS0tLVZhbGlkYXRvciBJbXBsZW1lbnRhdGlvbi0tLS0tLS0tLS1cblxuICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3QgZXJyb3JzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgY29uc3QgcnVsZUVycm9yU3RvcmUgPSBbXSBhcyBhbnk7XG4gICAgbGV0IGhhc0Vycm9ycyA9IGZhbHNlO1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuY29uZmlnLmFsbG93RW1wdHlSdWxlc2V0cyAmJlxuICAgICAgdGhpcy5jaGVja0VtcHR5UnVsZUluUnVsZXNldCh0aGlzLmRhdGEpXG4gICAgKSB7XG4gICAgICBlcnJvcnNbJ2VtcHR5J10gPSBcIkVtcHR5IHJ1bGVzZXRzIGFyZSBub3QgYWxsb3dlZC5cIjtcbiAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZGF0ZVJ1bGVzSW5SdWxlc2V0KHRoaXMuZGF0YSwgcnVsZUVycm9yU3RvcmUpO1xuXG4gICAgaWYgKHJ1bGVFcnJvclN0b3JlLmxlbmd0aCkge1xuICAgICAgZXJyb3JzWydydWxlcyddID0gcnVsZUVycm9yU3RvcmU7XG4gICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGFzRXJyb3JzID8gZXJyb3JzIDogbnVsbDtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS1Db250cm9sVmFsdWVBY2Nlc3NvciBJbXBsZW1lbnRhdGlvbi0tLS0tLS0tLS1cblxuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogUnVsZVNldCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IFJ1bGVTZXQpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGZvciAobGV0IHJ1bGUgb2YgdmFsdWUucnVsZXMpIHtcbiAgICAgICAgcnVsZS50ZW1wRmllbGQgPSBydWxlLmZpZWxkO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBXaGVuIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZCB3aXRob3V0IGEgZm9ybUNvbnRyb2wsIG51bGwgaXMgcGFzc2VkIHRvIHZhbHVlXG4gICAgdGhpcy5kYXRhID0gdmFsdWUgfHwgeyBjb25kaXRpb246IFwiYWRkXCIsIHJ1bGVzOiBbXSB9O1xuICAgIHRoaXMuaGFuZGxlRGF0YUNoYW5nZSgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSBvYmo7XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gKCkgPT4gZm4odGhpcy5kYXRhKTtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IGZuKHRoaXMuZGF0YSk7XG4gIH1cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tRU5ELS0tLS0tLS0tLVxuXG4gIGdldERpc2FibGVkU3RhdGUgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gIH07XG5cbiAgZmluZFRlbXBsYXRlRm9yUnVsZShydWxlOiBSdWxlKTogVGVtcGxhdGVSZWY8YW55PiB8IGFueSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZ2V0SW5wdXRUeXBlKHJ1bGUuZmllbGQsIHJ1bGUub3BlcmF0b3IgYXMgc3RyaW5nKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgY29uc3QgcXVlcnlJbnB1dCA9IHRoaXMuZmluZFF1ZXJ5SW5wdXQodHlwZSk7XG4gICAgICBpZiAocXVlcnlJbnB1dCkge1xuICAgICAgICByZXR1cm4gcXVlcnlJbnB1dC50ZW1wbGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRUZW1wbGF0ZVR5cGVzLmluZGV4T2YodHlwZSkgPT09IC0xKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCB0ZW1wbGF0ZSBmb3IgZmllbGQgd2l0aCB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmluZFF1ZXJ5SW5wdXQodHlwZTogc3RyaW5nKTogUXVlcnlJbnB1dERpcmVjdGl2ZSB7XG4gICAgY29uc3QgdGVtcGxhdGVzID0gdGhpcy5wYXJlbnRJbnB1dFRlbXBsYXRlcyB8fCB0aGlzLmlucHV0VGVtcGxhdGVzO1xuICAgIHJldHVybiB0ZW1wbGF0ZXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLnF1ZXJ5SW5wdXRUeXBlID09PSB0eXBlXG4gICAgKSBhcyBRdWVyeUlucHV0RGlyZWN0aXZlO1xuICB9XG5cbiAgZ2V0T3BlcmF0b3JzKGZpZWxkOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgbGV0IHRlbXBGaWVsZCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmllbGQpKTtcbiAgICBpZiAodGhpcy5vcGVyYXRvcnNDYWNoZVt0ZW1wRmllbGRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcGVyYXRvcnNDYWNoZVt0ZW1wRmllbGRdO1xuICAgIH1cbiAgICBsZXQgb3BlcmF0b3JzID0gdGhpcy5kZWZhdWx0RW1wdHlMaXN0O1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0ID0gdGhpcy5jb25maWcuZmllbGRzW3RlbXBGaWVsZF07XG5cbiAgICBpZiAodGhpcy5jb25maWcuZ2V0T3BlcmF0b3JzKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0T3BlcmF0b3JzKHRlbXBGaWVsZCwgZmllbGRPYmplY3QpO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSBmaWVsZE9iamVjdC50eXBlO1xuXG4gICAgaWYgKGZpZWxkT2JqZWN0ICYmIGZpZWxkT2JqZWN0Lm9wZXJhdG9ycykge1xuICAgICAgb3BlcmF0b3JzID0gZmllbGRPYmplY3Qub3BlcmF0b3JzO1xuICAgIH0gZWxzZSBpZiAodHlwZSkge1xuICAgICAgb3BlcmF0b3JzID1cbiAgICAgICAgKHRoaXMub3BlcmF0b3JNYXAgJiYgdGhpcy5vcGVyYXRvck1hcFt0eXBlXSkgfHxcbiAgICAgICAgdGhpcy5kZWZhdWx0T3BlcmF0b3JNYXBbdHlwZV0gfHxcbiAgICAgICAgdGhpcy5kZWZhdWx0RW1wdHlMaXN0O1xuICAgICAgaWYgKG9wZXJhdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBObyBvcGVyYXRvcnMgZm91bmQgZm9yIGZpZWxkICcke2ZpZWxkfScgd2l0aCB0eXBlICR7ZmllbGRPYmplY3QudHlwZX0uIGAgK1xuICAgICAgICAgICAgYFBsZWFzZSBkZWZpbmUgYW4gJ29wZXJhdG9ycycgcHJvcGVydHkgb24gdGhlIGZpZWxkIG9yIHVzZSB0aGUgJ29wZXJhdG9yTWFwJyBiaW5kaW5nIHRvIGZpeCB0aGlzLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZE9iamVjdC5udWxsYWJsZSkge1xuICAgICAgICBvcGVyYXRvcnMgPSBvcGVyYXRvcnMuY29uY2F0KFtcImlzIG51bGxcIiwgXCJpcyBub3QgbnVsbFwiXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihgTm8gJ3R5cGUnIHByb3BlcnR5IGZvdW5kIG9uIGZpZWxkOiAnJHtmaWVsZH0nYCk7XG4gICAgfVxuXG4gICAgLy8gQ2FjaGUgcmVmZXJlbmNlIHRvIGFycmF5IG9iamVjdCwgc28gaXQgd29uJ3QgYmUgY29tcHV0ZWQgbmV4dCB0aW1lIGFuZCB0cmlnZ2VyIGEgcmVyZW5kZXIuXG4gICAgdGhpcy5vcGVyYXRvcnNDYWNoZVtmaWVsZF0gPSBvcGVyYXRvcnM7XG4gICAgcmV0dXJuIG9wZXJhdG9ycztcbiAgfVxuXG4gIGdldEZpZWxkcyhlbnRpdHk6IHN0cmluZyk6IEZpZWxkW10ge1xuICAgIGlmICh0aGlzLmVudGl0aWVzLmxlbmd0aCAmJiBlbnRpdHkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpZWxkcy5maWx0ZXIoKGZpZWxkKSA9PiB7XG4gICAgICAgIHJldHVybiBmaWVsZCAmJiBmaWVsZC5lbnRpdHkgPT09IGVudGl0eTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5maWVsZHM7XG4gICAgfVxuICB9XG5cbiAgZ2V0SW5wdXRUeXBlKGZpZWxkOiBzdHJpbmcsIG9wZXJhdG9yOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy5jb25maWcuZ2V0SW5wdXRUeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0SW5wdXRUeXBlKGZpZWxkLCBvcGVyYXRvcik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5maWVsZHNbZmllbGRdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBObyBjb25maWd1cmF0aW9uIGZvciBmaWVsZCAnJHtmaWVsZH0nIGNvdWxkIGJlIGZvdW5kISBQbGVhc2UgYWRkIGl0IHRvIGNvbmZpZy5maWVsZHMuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gdGhpcy5jb25maWcuZmllbGRzW2ZpZWxkXS50eXBlO1xuICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICAgIGNhc2UgXCJpcyBudWxsXCI6XG4gICAgICBjYXNlIFwiaXMgbm90IG51bGxcIjpcbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIE5vIGRpc3BsYXllZCBjb21wb25lbnRcbiAgICAgIGNhc2UgXCJpblwiOlxuICAgICAgY2FzZSBcIm5vdCBpblwiOlxuICAgICAgICByZXR1cm4gdHlwZSA9PT0gXCJjYXRlZ29yeVwiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiID8gXCJtdWx0aXNlbGVjdFwiIDogdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIGdldE9wdGlvbnMoZmllbGQ6IHN0cmluZyk6IE9wdGlvbltdIHtcbiAgICBsZXQgdGVtcEZpZWxkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWVsZCkpO1xuICAgIC8vIHRlbXBGaWVsZCA9IHRlbXBGaWVsZC5zbGljZSgxLHRlbXBGaWVsZC5sZW5ndGgtMSk7ICAgICAgIC8vYWRkZWRcbiAgICBpZiAodGhpcy5jb25maWcuZ2V0T3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldE9wdGlvbnModGVtcEZpZWxkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmZpZWxkc1t0ZW1wRmllbGRdLm9wdGlvbnMgfHwgdGhpcy5kZWZhdWx0RW1wdHlMaXN0O1xuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lcyguLi5hcmdzOiBzdHJpbmdbXSk6IGFueSB8IHN0cmluZ1tdIHtcbiAgICBjb25zdCBjbHNMb29rdXAgPSB0aGlzLmNsYXNzTmFtZXNcbiAgICAgID8gdGhpcy5jbGFzc05hbWVzXG4gICAgICA6ICh0aGlzLmRlZmF1bHRDbGFzc05hbWVzIGFzIGFueSk7XG4gICAgY29uc3QgZGVmYXVsdENsYXNzTmFtZXMgPSB0aGlzLmRlZmF1bHRDbGFzc05hbWVzIGFzIGFueTtcbiAgICBjb25zdCBjbGFzc05hbWVzID0gYXJnc1xuICAgICAgLm1hcCgoaWQ6IGFueSkgPT4gY2xzTG9va3VwW2lkXSB8fCBkZWZhdWx0Q2xhc3NOYW1lc1tpZF0pXG4gICAgICAuZmlsdGVyKChjOiBhbnkpID0+ICEhYyk7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMubGVuZ3RoID8gY2xhc3NOYW1lcy5qb2luKFwiIFwiKSA6IFtdO1xuICB9XG5cbiAgZ2V0RGVmYXVsdEZpZWxkKGVudGl0eTogRW50aXR5KTogRmllbGQgfCBudWxsIHtcbiAgICBpZiAoIWVudGl0eSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChlbnRpdHkuZGVmYXVsdEZpZWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRWYWx1ZShlbnRpdHkuZGVmYXVsdEZpZWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZW50aXR5RmllbGRzID0gdGhpcy5maWVsZHMuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgICByZXR1cm4gZmllbGQgJiYgZmllbGQuZW50aXR5ID09PSBlbnRpdHkudmFsdWU7XG4gICAgICB9KTtcbiAgICAgIGlmIChlbnRpdHlGaWVsZHMgJiYgZW50aXR5RmllbGRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZW50aXR5RmllbGRzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBObyBmaWVsZHMgZm91bmQgZm9yIGVudGl0eSAnJHtlbnRpdHkubmFtZX0nLiBgICtcbiAgICAgICAgICAgIGBBICdkZWZhdWx0T3BlcmF0b3InIGlzIGFsc28gbm90IHNwZWNpZmllZCBvbiB0aGUgZmllbGQgY29uZmlnLiBPcGVyYXRvciB2YWx1ZSB3aWxsIGRlZmF1bHQgdG8gbnVsbC5gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldERlZmF1bHRPcGVyYXRvcihmaWVsZDogRmllbGQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoZmllbGQgJiYgZmllbGQuZGVmYXVsdE9wZXJhdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRWYWx1ZShmaWVsZC5kZWZhdWx0T3BlcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvcGVyYXRvcnMgPSB0aGlzLmdldE9wZXJhdG9ycyhmaWVsZC52YWx1ZSBhcyBzdHJpbmcpO1xuICAgICAgaWYgKG9wZXJhdG9ycyAmJiBvcGVyYXRvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRvcnNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYE5vIG9wZXJhdG9ycyBmb3VuZCBmb3IgZmllbGQgJyR7ZmllbGQudmFsdWV9Jy4gYCArXG4gICAgICAgICAgICBgQSAnZGVmYXVsdE9wZXJhdG9yJyBpcyBhbHNvIG5vdCBzcGVjaWZpZWQgb24gdGhlIGZpZWxkIGNvbmZpZy4gT3BlcmF0b3IgdmFsdWUgd2lsbCBkZWZhdWx0IHRvIG51bGwuYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRSdWxlKHBhcmVudD86IFJ1bGVTZXQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBhcmVudCA9IHBhcmVudCB8fCB0aGlzLmRhdGE7XG4gICAgaWYgKHRoaXMuY29uZmlnLmFkZFJ1bGUpIHtcbiAgICAgIHRoaXMuY29uZmlnLmFkZFJ1bGUocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZpZWxkID0gdGhpcy5maWVsZHNbMF07XG4gICAgICBwYXJlbnQucnVsZXMgPSBwYXJlbnQucnVsZXMuY29uY2F0KFtcbiAgICAgICAge1xuICAgICAgICAgIGZpZWxkOiBmaWVsZC52YWx1ZSBhcyBzdHJpbmcsXG4gICAgICAgICAgb3BlcmF0b3I6IHRoaXMuZ2V0RGVmYXVsdE9wZXJhdG9yKGZpZWxkKSBhcyBzdHJpbmcsXG4gICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKGZpZWxkLmRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgZW50aXR5OiBmaWVsZC5lbnRpdHksXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZVRvdWNoZWQoKTtcbiAgICB0aGlzLmhhbmRsZURhdGFDaGFuZ2UoKTtcbiAgfVxuXG4gIHJlbW92ZVJ1bGUocnVsZTogUnVsZSwgcGFyZW50PzogUnVsZVNldCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGFyZW50ID0gcGFyZW50IHx8IHRoaXMuZGF0YTtcbiAgICBpZiAodGhpcy5jb25maWcucmVtb3ZlUnVsZSkge1xuICAgICAgdGhpcy5jb25maWcucmVtb3ZlUnVsZShydWxlLCBwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnQucnVsZXMgPSBwYXJlbnQucnVsZXMuZmlsdGVyKChyKSA9PiByICE9PSBydWxlKTtcbiAgICB9XG4gICAgdGhpcy5pbnB1dENvbnRleHRDYWNoZS5kZWxldGUocnVsZSk7XG4gICAgdGhpcy5vcGVyYXRvckNvbnRleHRDYWNoZS5kZWxldGUocnVsZSk7XG4gICAgdGhpcy5maWVsZENvbnRleHRDYWNoZS5kZWxldGUocnVsZSk7XG4gICAgdGhpcy5lbnRpdHlDb250ZXh0Q2FjaGUuZGVsZXRlKHJ1bGUpO1xuICAgIHRoaXMucmVtb3ZlQnV0dG9uQ29udGV4dENhY2hlLmRlbGV0ZShydWxlKTtcblxuICAgIHRoaXMuaGFuZGxlVG91Y2hlZCgpO1xuICAgIHRoaXMuaGFuZGxlRGF0YUNoYW5nZSgpO1xuICB9XG5cbiAgYWRkUnVsZVNldChwYXJlbnQ/OiBSdWxlU2V0KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgdGhpcy5kYXRhO1xuICAgIGlmICh0aGlzLmNvbmZpZy5hZGRSdWxlU2V0KSB7XG4gICAgICB0aGlzLmNvbmZpZy5hZGRSdWxlU2V0KHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudC5ydWxlcyA9IHBhcmVudC5ydWxlcy5jb25jYXQoW3sgY29uZGl0aW9uOiBcImFkZFwiLCBydWxlczogW10gfV0pO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlVG91Y2hlZCgpO1xuICAgIHRoaXMuaGFuZGxlRGF0YUNoYW5nZSgpO1xuICB9XG5cbiAgcmVtb3ZlUnVsZVNldChydWxlc2V0PzogUnVsZVNldCwgcGFyZW50PzogUnVsZVNldCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcnVsZXNldCA9IHJ1bGVzZXQgfHwgdGhpcy5kYXRhO1xuICAgIHBhcmVudCA9IHBhcmVudCB8fCB0aGlzLnBhcmVudFZhbHVlO1xuICAgIGlmICh0aGlzLmNvbmZpZy5yZW1vdmVSdWxlU2V0KSB7XG4gICAgICB0aGlzLmNvbmZpZy5yZW1vdmVSdWxlU2V0KHJ1bGVzZXQsIHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudC5ydWxlcyA9IHBhcmVudC5ydWxlcy5maWx0ZXIoKHIpID0+IHIgIT09IHJ1bGVzZXQpO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlVG91Y2hlZCgpO1xuICAgIHRoaXMuaGFuZGxlRGF0YUNoYW5nZSgpO1xuICB9XG5cbiAgdHJhbnNpdGlvbkVuZChlOiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMudHJlZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXB1dGVkVHJlZUNvbnRhaW5lckhlaWdodCgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kYXRhLmNvbGxhcHNlZCA9ICF0aGlzLmRhdGEuY29sbGFwc2VkO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBjb21wdXRlZFRyZWVDb250YWluZXJIZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLnRyZWVDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBpZiAobmF0aXZlRWxlbWVudCAmJiBuYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICBuYXRpdmVFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9XG4gICAgICAgIG5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2xpZW50SGVpZ2h0ICsgOCArIFwicHhcIjtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VDb25kaXRpb24odmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGF0YS5jb25kaXRpb24gPSB2YWx1ZTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xuICAgIHRoaXMuaGFuZGxlVG91Y2hlZCgpO1xuICAgIHRoaXMuaGFuZGxlRGF0YUNoYW5nZSgpO1xuICB9XG5cbiAgY2hhbmdlT3BlcmF0b3IocnVsZTogUnVsZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLmNvZXJjZVZhbHVlRm9yT3BlcmF0b3IpIHtcbiAgICAgIHJ1bGUudmFsdWUgPSB0aGlzLmNvbmZpZy5jb2VyY2VWYWx1ZUZvck9wZXJhdG9yKFxuICAgICAgICBydWxlLm9wZXJhdG9yIGFzIHN0cmluZyxcbiAgICAgICAgcnVsZS52YWx1ZSxcbiAgICAgICAgcnVsZVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcnVsZS52YWx1ZSA9IHRoaXMuY29lcmNlVmFsdWVGb3JPcGVyYXRvcihcbiAgICAgICAgcnVsZS5vcGVyYXRvciBhcyBzdHJpbmcsXG4gICAgICAgIHJ1bGUudmFsdWUsXG4gICAgICAgIHJ1bGVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVUb3VjaGVkKCk7XG4gICAgdGhpcy5oYW5kbGVEYXRhQ2hhbmdlKCk7XG4gIH1cblxuICBjb2VyY2VWYWx1ZUZvck9wZXJhdG9yKG9wZXJhdG9yOiBzdHJpbmcsIHZhbHVlOiBhbnksIHJ1bGU6IFJ1bGUpOiBhbnkge1xuICAgIGNvbnN0IGlucHV0VHlwZTogc3RyaW5nIHwgbnVsbCA9IHRoaXMuZ2V0SW5wdXRUeXBlKHJ1bGUuZmllbGQsIG9wZXJhdG9yKTtcbiAgICBpZiAoaW5wdXRUeXBlID09PSBcIm11bHRpc2VsZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gW3ZhbHVlXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgY2hhbmdlSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZVRvdWNoZWQoKTtcbiAgICB0aGlzLmhhbmRsZURhdGFDaGFuZ2UoKTtcbiAgfVxuXG4gIGNoYW5nZUZpZWxkKGZpZWxkVmFsdWU6IHN0cmluZywgcnVsZTogUnVsZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGZpZWxkVmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBydWxlLmZpZWxkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShydWxlLnRlbXBGaWVsZCkpO1xuXG4gICAgY29uc3QgaW5wdXRDb250ZXh0ID0gdGhpcy5pbnB1dENvbnRleHRDYWNoZS5nZXQocnVsZSk7XG4gICAgY29uc3QgY3VycmVudEZpZWxkID0gaW5wdXRDb250ZXh0ICYmIGlucHV0Q29udGV4dC5maWVsZDtcblxuICAgIGNvbnN0IG5leHRGaWVsZDogRmllbGQgPSB0aGlzLmNvbmZpZy5maWVsZHNbZmllbGRWYWx1ZV07XG5cbiAgICBjb25zdCBuZXh0VmFsdWUgPSB0aGlzLmNhbGN1bGF0ZUZpZWxkQ2hhbmdlVmFsdWUoXG4gICAgICBjdXJyZW50RmllbGQgYXMgRmllbGQsXG4gICAgICBuZXh0RmllbGQsXG4gICAgICBydWxlLnZhbHVlXG4gICAgKTtcblxuICAgIGlmIChuZXh0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVsZS52YWx1ZSA9IG5leHRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHJ1bGUudmFsdWU7XG4gICAgfVxuXG4gICAgcnVsZS5vcGVyYXRvciA9IHRoaXMuZ2V0RGVmYXVsdE9wZXJhdG9yKG5leHRGaWVsZCkgYXMgc3RyaW5nO1xuXG4gICAgLy8gQ3JlYXRlIG5ldyBjb250ZXh0IG9iamVjdHMgc28gdGVtcGxhdGVzIHdpbGwgYXV0b21hdGljYWxseSB1cGRhdGVcbiAgICB0aGlzLmlucHV0Q29udGV4dENhY2hlLmRlbGV0ZShydWxlKTtcbiAgICB0aGlzLm9wZXJhdG9yQ29udGV4dENhY2hlLmRlbGV0ZShydWxlKTtcbiAgICB0aGlzLmZpZWxkQ29udGV4dENhY2hlLmRlbGV0ZShydWxlKTtcbiAgICB0aGlzLmVudGl0eUNvbnRleHRDYWNoZS5kZWxldGUocnVsZSk7XG4gICAgdGhpcy5nZXRJbnB1dENvbnRleHQocnVsZSk7XG4gICAgdGhpcy5nZXRGaWVsZENvbnRleHQocnVsZSk7XG4gICAgdGhpcy5nZXRPcGVyYXRvckNvbnRleHQocnVsZSk7XG4gICAgdGhpcy5nZXRFbnRpdHlDb250ZXh0KHJ1bGUpO1xuXG4gICAgdGhpcy5oYW5kbGVUb3VjaGVkKCk7XG4gICAgdGhpcy5oYW5kbGVEYXRhQ2hhbmdlKCk7XG4gIH1cblxuICBjaGFuZ2VFbnRpdHkoXG4gICAgZW50aXR5VmFsdWU6IHN0cmluZyxcbiAgICBydWxlOiBSdWxlLFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgZGF0YTogUnVsZVNldFxuICApOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaSA9IGluZGV4O1xuICAgIGxldCBycyA9IGRhdGE7XG4gICAgY29uc3QgZW50aXR5OiBFbnRpdHkgPSB0aGlzLmVudGl0aWVzLmZpbmQoXG4gICAgICAoZSkgPT4gZS52YWx1ZSA9PT0gZW50aXR5VmFsdWVcbiAgICApIGFzIEVudGl0eTtcbiAgICBjb25zdCBkZWZhdWx0RmllbGQ6IEZpZWxkID0gdGhpcy5nZXREZWZhdWx0RmllbGQoZW50aXR5KSBhcyBGaWVsZDtcbiAgICBpZiAoIXJzKSB7XG4gICAgICBycyA9IHRoaXMuZGF0YTtcbiAgICAgIGkgPSBycy5ydWxlcy5maW5kSW5kZXgoKHgpID0+IHggPT09IHJ1bGUpO1xuICAgIH1cbiAgICBydWxlLmZpZWxkID0gZGVmYXVsdEZpZWxkLnZhbHVlIGFzIHN0cmluZztcbiAgICBycy5ydWxlc1tpXSA9IHJ1bGU7XG4gICAgaWYgKGRlZmF1bHRGaWVsZCkge1xuICAgICAgdGhpcy5jaGFuZ2VGaWVsZChkZWZhdWx0RmllbGQudmFsdWUgYXMgc3RyaW5nLCBydWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYW5kbGVUb3VjaGVkKCk7XG4gICAgICB0aGlzLmhhbmRsZURhdGFDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXREZWZhdWx0VmFsdWUoZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xuICAgIHN3aXRjaCAodHlwZW9mIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWUoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0T3BlcmF0b3JUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB7XG4gICAgY29uc3QgdCA9IHRoaXMucGFyZW50T3BlcmF0b3JUZW1wbGF0ZSB8fCB0aGlzLm9wZXJhdG9yVGVtcGxhdGU7XG4gICAgcmV0dXJuIHQgPyB0LnRlbXBsYXRlIDogbnVsbDtcbiAgfVxuXG4gIGdldEZpZWxkVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IHQgPSB0aGlzLnBhcmVudEZpZWxkVGVtcGxhdGUgfHwgdGhpcy5maWVsZFRlbXBsYXRlO1xuICAgIHJldHVybiB0ID8gdC50ZW1wbGF0ZSA6IG51bGw7XG4gIH1cblxuICBnZXRFbnRpdHlUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB7XG4gICAgY29uc3QgdCA9IHRoaXMucGFyZW50RW50aXR5VGVtcGxhdGUgfHwgdGhpcy5lbnRpdHlUZW1wbGF0ZTtcbiAgICByZXR1cm4gdCA/IHQudGVtcGxhdGUgOiBudWxsO1xuICB9XG5cbiAgZ2V0QXJyb3dJY29uVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IHQgPSB0aGlzLnBhcmVudEFycm93SWNvblRlbXBsYXRlIHx8IHRoaXMuYXJyb3dJY29uVGVtcGxhdGU7XG4gICAgcmV0dXJuIHQgPyB0LnRlbXBsYXRlIDogbnVsbDtcbiAgfVxuXG4gIGdldEJ1dHRvbkdyb3VwVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IHQgPSB0aGlzLnBhcmVudEJ1dHRvbkdyb3VwVGVtcGxhdGUgfHwgdGhpcy5idXR0b25Hcm91cFRlbXBsYXRlO1xuICAgIHJldHVybiB0ID8gdC50ZW1wbGF0ZSA6IG51bGw7XG4gIH1cblxuICBnZXRTd2l0Y2hHcm91cFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHtcbiAgICBjb25zdCB0ID0gdGhpcy5wYXJlbnRTd2l0Y2hHcm91cFRlbXBsYXRlIHx8IHRoaXMuc3dpdGNoR3JvdXBUZW1wbGF0ZTtcbiAgICByZXR1cm4gdCA/IHQudGVtcGxhdGUgOiBudWxsO1xuICB9XG5cbiAgZ2V0UmVtb3ZlQnV0dG9uVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IHQgPSB0aGlzLnBhcmVudFJlbW92ZUJ1dHRvblRlbXBsYXRlIHx8IHRoaXMucmVtb3ZlQnV0dG9uVGVtcGxhdGU7XG4gICAgcmV0dXJuIHQgPyB0LnRlbXBsYXRlIDogbnVsbDtcbiAgfVxuXG4gIGdldEVtcHR5V2FybmluZ1RlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHtcbiAgICBjb25zdCB0ID0gdGhpcy5wYXJlbnRFbXB0eVdhcm5pbmdUZW1wbGF0ZSB8fCB0aGlzLmVtcHR5V2FybmluZ1RlbXBsYXRlO1xuICAgIHJldHVybiB0ID8gdC50ZW1wbGF0ZSA6IG51bGw7XG4gIH1cblxuICBnZXRRdWVyeUl0ZW1DbGFzc05hbWUobG9jYWw6IExvY2FsUnVsZU1ldGEpOiBzdHJpbmcge1xuICAgIGxldCBjbHMgPSB0aGlzLmdldENsYXNzTmFtZXMoXCJyb3dcIiwgXCJjb25uZWN0b3JcIiwgXCJ0cmFuc2l0aW9uXCIpO1xuICAgIGNscyArPSBcIiBcIiArIHRoaXMuZ2V0Q2xhc3NOYW1lcyhsb2NhbC5ydWxlc2V0ID8gXCJydWxlU2V0XCIgOiBcInJ1bGVcIik7XG4gICAgaWYgKGxvY2FsLmludmFsaWQpIHtcbiAgICAgIGNscyArPSBcIiBcIiArIHRoaXMuZ2V0Q2xhc3NOYW1lcyhcImludmFsaWRSdWxlU2V0XCIpO1xuICAgIH1cbiAgICByZXR1cm4gY2xzIGFzIHN0cmluZztcbiAgfVxuXG4gIGdldEJ1dHRvbkdyb3VwQ29udGV4dCgpOiBCdXR0b25Hcm91cENvbnRleHQge1xuICAgIGlmICghdGhpcy5idXR0b25Hcm91cENvbnRleHQpIHtcbiAgICAgIHRoaXMuYnV0dG9uR3JvdXBDb250ZXh0ID0ge1xuICAgICAgICBhZGRSdWxlOiB0aGlzLmFkZFJ1bGUuYmluZCh0aGlzKSxcbiAgICAgICAgYWRkUnVsZVNldDogdGhpcy5hbGxvd1J1bGVzZXQgJiYgKHRoaXMuYWRkUnVsZVNldC5iaW5kKHRoaXMpIGFzIGFueSksXG4gICAgICAgIHJlbW92ZVJ1bGVTZXQ6XG4gICAgICAgICAgdGhpcy5hbGxvd1J1bGVzZXQgJiZcbiAgICAgICAgICB0aGlzLnBhcmVudFZhbHVlICYmXG4gICAgICAgICAgKHRoaXMucmVtb3ZlUnVsZVNldC5iaW5kKHRoaXMpIGFzIGFueSksXG4gICAgICAgIGdldERpc2FibGVkU3RhdGU6IHRoaXMuZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgJGltcGxpY2l0OiB0aGlzLmRhdGEsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5idXR0b25Hcm91cENvbnRleHQ7XG4gIH1cblxuICBnZXRSZW1vdmVCdXR0b25Db250ZXh0KHJ1bGU6IFJ1bGUpOiBSZW1vdmVCdXR0b25Db250ZXh0IHtcbiAgICBpZiAoIXRoaXMucmVtb3ZlQnV0dG9uQ29udGV4dENhY2hlLmhhcyhydWxlKSkge1xuICAgICAgdGhpcy5yZW1vdmVCdXR0b25Db250ZXh0Q2FjaGUuc2V0KHJ1bGUsIHtcbiAgICAgICAgcmVtb3ZlUnVsZTogdGhpcy5yZW1vdmVSdWxlLmJpbmQodGhpcyksXG4gICAgICAgIGdldERpc2FibGVkU3RhdGU6IHRoaXMuZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgJGltcGxpY2l0OiBydWxlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbW92ZUJ1dHRvbkNvbnRleHRDYWNoZS5nZXQocnVsZSkgYXMgUmVtb3ZlQnV0dG9uQ29udGV4dDtcbiAgfVxuXG4gIGdldEZpZWxkQ29udGV4dChydWxlOiBSdWxlKTogRmllbGRDb250ZXh0IHtcbiAgICBpZiAoIXRoaXMuZmllbGRDb250ZXh0Q2FjaGUuaGFzKHJ1bGUpKSB7XG4gICAgICB0aGlzLmZpZWxkQ29udGV4dENhY2hlLnNldChydWxlLCB7XG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLmNoYW5nZUZpZWxkLmJpbmQodGhpcyksXG4gICAgICAgIGdldEZpZWxkczogdGhpcy5nZXRGaWVsZHMuYmluZCh0aGlzKSxcbiAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZTogdGhpcy5nZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICBmaWVsZHM6IHRoaXMuZmllbGRzLFxuICAgICAgICAkaW1wbGljaXQ6IHJ1bGUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmllbGRDb250ZXh0Q2FjaGUuZ2V0KHJ1bGUpIGFzIEZpZWxkQ29udGV4dDtcbiAgfVxuXG4gIGdldEVudGl0eUNvbnRleHQocnVsZTogUnVsZSk6IEVudGl0eUNvbnRleHQge1xuICAgIGlmICghdGhpcy5lbnRpdHlDb250ZXh0Q2FjaGUuaGFzKHJ1bGUpKSB7XG4gICAgICB0aGlzLmVudGl0eUNvbnRleHRDYWNoZS5zZXQocnVsZSwge1xuICAgICAgICBvbkNoYW5nZTogdGhpcy5jaGFuZ2VFbnRpdHkuYmluZCh0aGlzKSBhcyBhbnksXG4gICAgICAgIGdldERpc2FibGVkU3RhdGU6IHRoaXMuZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgZW50aXRpZXM6IHRoaXMuZW50aXRpZXMsXG4gICAgICAgICRpbXBsaWNpdDogcnVsZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbnRpdHlDb250ZXh0Q2FjaGUuZ2V0KHJ1bGUpIGFzIEVudGl0eUNvbnRleHQ7XG4gIH1cblxuICBnZXRTd2l0Y2hHcm91cENvbnRleHQoKTogU3dpdGNoR3JvdXBDb250ZXh0IHtcbiAgICByZXR1cm4ge1xuICAgICAgb25DaGFuZ2U6IHRoaXMuY2hhbmdlQ29uZGl0aW9uLmJpbmQodGhpcyksXG4gICAgICBnZXREaXNhYmxlZFN0YXRlOiB0aGlzLmdldERpc2FibGVkU3RhdGUsXG4gICAgICAkaW1wbGljaXQ6IHRoaXMuZGF0YSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0QXJyb3dJY29uQ29udGV4dCgpOiBBcnJvd0ljb25Db250ZXh0IHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0RGlzYWJsZWRTdGF0ZTogdGhpcy5nZXREaXNhYmxlZFN0YXRlLFxuICAgICAgJGltcGxpY2l0OiB0aGlzLmRhdGEsXG4gICAgfTtcbiAgfVxuXG4gIGdldEVtcHR5V2FybmluZ0NvbnRleHQoKTogRW1wdHlXYXJuaW5nQ29udGV4dCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldERpc2FibGVkU3RhdGU6IHRoaXMuZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgIG1lc3NhZ2U6IHRoaXMuZW1wdHlNZXNzYWdlLFxuICAgICAgJGltcGxpY2l0OiB0aGlzLmRhdGEsXG4gICAgfTtcbiAgfVxuXG4gIGdldE9wZXJhdG9yQ29udGV4dChydWxlOiBSdWxlKTogT3BlcmF0b3JDb250ZXh0IHtcbiAgICBpZiAoIXRoaXMub3BlcmF0b3JDb250ZXh0Q2FjaGUuaGFzKHJ1bGUpKSB7XG4gICAgICB0aGlzLm9wZXJhdG9yQ29udGV4dENhY2hlLnNldChydWxlLCB7XG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLmNoYW5nZU9wZXJhdG9yLmJpbmQodGhpcykgYXMgYW55LFxuICAgICAgICBnZXREaXNhYmxlZFN0YXRlOiB0aGlzLmdldERpc2FibGVkU3RhdGUsXG4gICAgICAgIG9wZXJhdG9yczogdGhpcy5nZXRPcGVyYXRvcnMocnVsZS5maWVsZCksXG4gICAgICAgICRpbXBsaWNpdDogcnVsZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcGVyYXRvckNvbnRleHRDYWNoZS5nZXQocnVsZSkgYXMgT3BlcmF0b3JDb250ZXh0O1xuICB9XG5cbiAgZ2V0SW5wdXRDb250ZXh0KHJ1bGU6IFJ1bGUpOiBJbnB1dENvbnRleHQge1xuICAgIGlmICghdGhpcy5pbnB1dENvbnRleHRDYWNoZS5oYXMocnVsZSkpIHtcbiAgICAgIHRoaXMuaW5wdXRDb250ZXh0Q2FjaGUuc2V0KHJ1bGUsIHtcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMuY2hhbmdlSW5wdXQuYmluZCh0aGlzKSxcbiAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZTogdGhpcy5nZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICBvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMocnVsZS5maWVsZCksXG4gICAgICAgIGZpZWxkOiB0aGlzLmNvbmZpZy5maWVsZHNbcnVsZS5maWVsZF0sXG4gICAgICAgICRpbXBsaWNpdDogcnVsZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbnB1dENvbnRleHRDYWNoZS5nZXQocnVsZSkgYXMgSW5wdXRDb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVGaWVsZENoYW5nZVZhbHVlKFxuICAgIGN1cnJlbnRGaWVsZDogRmllbGQsXG4gICAgbmV4dEZpZWxkOiBGaWVsZCxcbiAgICBjdXJyZW50VmFsdWU6IGFueVxuICApOiBhbnkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYWxjdWxhdGVGaWVsZENoYW5nZVZhbHVlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jYWxjdWxhdGVGaWVsZENoYW5nZVZhbHVlKFxuICAgICAgICBjdXJyZW50RmllbGQsXG4gICAgICAgIG5leHRGaWVsZCxcbiAgICAgICAgY3VycmVudFZhbHVlXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbktlZXBWYWx1ZSA9ICgpID0+IHtcbiAgICAgIGlmIChjdXJyZW50RmllbGQgPT0gbnVsbCB8fCBuZXh0RmllbGQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICBjdXJyZW50RmllbGQudHlwZSA9PT0gbmV4dEZpZWxkLnR5cGUgJiZcbiAgICAgICAgdGhpcy5kZWZhdWx0UGVyc2lzdFZhbHVlVHlwZXMuaW5kZXhPZihjdXJyZW50RmllbGQudHlwZSkgIT09IC0xXG4gICAgICApO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5wZXJzaXN0VmFsdWVPbkZpZWxkQ2hhbmdlICYmIGNhbktlZXBWYWx1ZSgpKSB7XG4gICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIGlmIChuZXh0RmllbGQgJiYgbmV4dEZpZWxkLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0VmFsdWUobmV4dEZpZWxkLmRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tFbXB0eVJ1bGVJblJ1bGVzZXQocnVsZXNldDogUnVsZVNldCk6IGJvb2xlYW4ge1xuICAgIGlmICghcnVsZXNldCB8fCAhcnVsZXNldC5ydWxlcyB8fCBydWxlc2V0LnJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBydWxlc2V0LnJ1bGVzLnNvbWUoKGl0ZW06IFJ1bGVTZXQgfCBhbnkpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ucnVsZXMpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja0VtcHR5UnVsZUluUnVsZXNldChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVSdWxlc0luUnVsZXNldChydWxlc2V0OiBSdWxlU2V0LCBlcnJvclN0b3JlOiBhbnlbXSkge1xuICAgIGlmIChydWxlc2V0ICYmIHJ1bGVzZXQucnVsZXMgJiYgcnVsZXNldC5ydWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBydWxlc2V0LnJ1bGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKChpdGVtIGFzIFJ1bGVTZXQpLnJ1bGVzKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVSdWxlc0luUnVsZXNldChpdGVtIGFzIFJ1bGVTZXQsIGVycm9yU3RvcmUpO1xuICAgICAgICB9IGVsc2UgaWYgKChpdGVtIGFzIFJ1bGUpLmZpZWxkKSB7XG4gICAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmNvbmZpZy5maWVsZHNbKGl0ZW0gYXMgUnVsZSkuZmllbGRdO1xuICAgICAgICAgIGlmIChmaWVsZCAmJiBmaWVsZC52YWxpZGF0b3IgJiYgZmllbGQudmFsaWRhdG9yLmFwcGx5KSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGZpZWxkLnZhbGlkYXRvcihpdGVtIGFzIFJ1bGUsIHJ1bGVzZXQpO1xuICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgZXJyb3JTdG9yZS5wdXNoKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRGF0YUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIGlmICh0aGlzLm9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJlbnRDaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5wYXJlbnRDaGFuZ2VDYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlVG91Y2hlZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vblRvdWNoZWRDYWxsYmFjaykge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJlbnRUb3VjaGVkQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMucGFyZW50VG91Y2hlZENhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ3N3aXRjaFJvdycpXCI+XG4gIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEFycm93SWNvbj5cbiAgICA8ZW0gW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnYXJyb3dJY29uJylcIj48L2VtPlxuICA8L25nLXRlbXBsYXRlPlxuXG4gIDxhXG4gICAgKm5nSWY9XCJhbGxvd0NvbGxhcHNlXCJcbiAgICAoY2xpY2spPVwidG9nZ2xlQ29sbGFwc2UoKVwiXG4gICAgW25nQ2xhc3NdPVwiXG4gICAgICBnZXRDbGFzc05hbWVzKCdhcnJvd0ljb25CdXR0b24nLCBkYXRhLmNvbGxhcHNlZCA/ICdjb2xsYXBzZWQnIDogJycpXG4gICAgXCJcbiAgPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ0lmPVwiZ2V0QXJyb3dJY29uVGVtcGxhdGUoKSBhcyB0ZW1wbGF0ZTsgZWxzZSBkZWZhdWx0QXJyb3dJY29uXCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IGdldEFycm93SWNvbkNvbnRleHQoKVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvYT5cblxuICA8bmctY29udGFpbmVyXG4gICAgKm5nSWY9XCJnZXRCdXR0b25Hcm91cFRlbXBsYXRlKCkgYXMgdGVtcGxhdGU7IGVsc2UgZGVmYXVsdEJ1dHRvbkdyb3VwXCJcbiAgPlxuICAgIDxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnYnV0dG9uR3JvdXAnLCAncmlnaHRBbGlnbicpXCI+XG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IGdldEJ1dHRvbkdyb3VwQ29udGV4dCgpXCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLXRlbXBsYXRlICNkZWZhdWx0QnV0dG9uR3JvdXA+XG4gICAgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdidXR0b25Hcm91cCcsICdyaWdodEFsaWduJylcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJhZGRSdWxlKClcIlxuICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdidXR0b24nKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICA+XG4gICAgICAgIDxlbSBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdhZGRJY29uJylcIj48L2VtPiBSdWxlXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJhZGRSdWxlU2V0KClcIlxuICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdidXR0b24nKVwiXG4gICAgICAgICpuZ0lmPVwiYWxsb3dSdWxlc2V0XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgID5cbiAgICAgICAgPGVtIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ2FkZEljb24nKVwiPjwvZW0+IFJ1bGVzZXRcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhcGFyZW50VmFsdWUgJiYgYWxsb3dSdWxlc2V0XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlUnVsZVNldCgpXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdidXR0b24nLCAncmVtb3ZlQnV0dG9uJylcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgID5cbiAgICAgICAgICBSZW1vdmVcbiAgICAgICAgICA8ZW0gW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygncmVtb3ZlSWNvbicpXCI+PC9lbT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cblxuICA8bmctY29udGFpbmVyXG4gICAgKm5nSWY9XCJnZXRTd2l0Y2hHcm91cFRlbXBsYXRlKCkgYXMgdGVtcGxhdGU7IGVsc2UgZGVmYXVsdFN3aXRjaEdyb3VwXCJcbiAgPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IGdldFN3aXRjaEdyb3VwQ29udGV4dCgpXCJcbiAgICA+PC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFN3aXRjaEdyb3VwPlxuICAgIDxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnc3dpdGNoR3JvdXAnLCAndHJhbnNpdGlvbicpXCIgKm5nSWY9XCJkYXRhXCI+XG4gICAgICA8ZGl2IFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ3N3aXRjaENvbnRyb2wnKVwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ3N3aXRjaFJhZGlvJylcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwiZGF0YS5jb25kaXRpb25cIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgKGNsaWNrKT1cImNoYW5nZUNvbmRpdGlvbihhbmRPcHRpb24udmFsdWUpXCJcbiAgICAgICAgICB2YWx1ZT1cImFuZFwiXG4gICAgICAgICAgI2FuZE9wdGlvblxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlQ29uZGl0aW9uKGFuZE9wdGlvbi52YWx1ZSlcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ3N3aXRjaExhYmVsJylcIlxuICAgICAgICAgID5BTkQ8L2xhYmVsXG4gICAgICAgID5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdzd2l0Y2hDb250cm9sJylcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdzd2l0Y2hSYWRpbycpXCJcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cImRhdGEuY29uZGl0aW9uXCJcbiAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlQ29uZGl0aW9uKG9yT3B0aW9uLnZhbHVlKVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICB2YWx1ZT1cIm9yXCJcbiAgICAgICAgICAjb3JPcHRpb25cbiAgICAgICAgLz5cbiAgICAgICAgPGxhYmVsXG4gICAgICAgICAgKGNsaWNrKT1cImNoYW5nZUNvbmRpdGlvbihvck9wdGlvbi52YWx1ZSlcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ3N3aXRjaExhYmVsJylcIlxuICAgICAgICAgID5PUjwvbGFiZWxcbiAgICAgICAgPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvbmctdGVtcGxhdGU+XG48L2Rpdj5cblxuPGRpdlxuICAjdHJlZUNvbnRhaW5lclxuICAodHJhbnNpdGlvbmVuZCk9XCJ0cmFuc2l0aW9uRW5kKCRldmVudClcIlxuICBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCd0cmVlQ29udGFpbmVyJywgZGF0YS5jb2xsYXBzZWQgPyAnY29sbGFwc2VkJyA6ICcnKVwiXG4+XG4gIDx1bCBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCd0cmVlJylcIiAqbmdJZj1cImRhdGEgJiYgZGF0YS5ydWxlc1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHJ1bGUgb2YgZGF0YS5ydWxlczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cIntcbiAgICAgICAgICBydWxlc2V0OiAhIXJ1bGUucnVsZXMsXG4gICAgICAgICAgaW52YWxpZDpcbiAgICAgICAgICAgICFjb25maWcuYWxsb3dFbXB0eVJ1bGVzZXRzICYmIHJ1bGUucnVsZXMgJiYgcnVsZS5ydWxlcy5sZW5ndGggPT09IDBcbiAgICAgICAgfSBhcyBsb2NhbFwiXG4gICAgICA+XG4gICAgICAgIDxsaSBjbGFzcz1cInJ1bGVcIiBbbmdDbGFzc109XCJnZXRRdWVyeUl0ZW1DbGFzc05hbWUobG9jYWwpXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFsb2NhbC5ydWxlc2V0XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgZ2V0UmVtb3ZlQnV0dG9uVGVtcGxhdGUoKSBhcyB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBlbHNlIGRlZmF1bHRSZW1vdmVCdXR0b25cbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdidXR0b25Hcm91cCcsICdyaWdodEFsaWduJylcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZ2V0UmVtb3ZlQnV0dG9uQ29udGV4dChydWxlKVxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFJlbW92ZUJ1dHRvbj5cbiAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdyZW1vdmVCdXR0b25TaXplJywgJ3JpZ2h0QWxpZ24nKVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnYnV0dG9uJywgJ3JlbW92ZUJ1dHRvbicpXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVSdWxlKHJ1bGUsIGRhdGEpXCJcbiAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgUmVtb3ZlIHJ1bGVcbiAgICAgICAgICAgICAgICAgIDxlbSBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdyZW1vdmVJY29uJylcIj48L2VtPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJlbnRpdGllcz8ubGVuZ3RoXCIgY2xhc3M9XCJxLWlubGluZS1ibG9jay1kaXNwbGF5XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImdldEVudGl0eVRlbXBsYXRlKCkgYXMgdGVtcGxhdGU7IGVsc2UgZGVmYXVsdEVudGl0eVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBnZXRFbnRpdHlDb250ZXh0KHJ1bGUpXCJcbiAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEVudGl0eT5cbiAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdlbnRpdHlDb250cm9sU2l6ZScpXCI+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnZW50aXR5Q29udHJvbCcpXCJcbiAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicnVsZS5lbnRpdHlcIlxuICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlRW50aXR5KCRldmVudCwgcnVsZSwgaSwgZGF0YSlcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8IS0tIDxvcHRpb24gKm5nRm9yPVwibGV0IGVudGl0eSBvZiBlbnRpdGllc1wiIFtuZ1ZhbHVlXT1cImVudGl0eS52YWx1ZVwiPiAtLT5cbiAgICAgICAgICAgICAgICAgIDwhLS0ge3tlbnRpdHkubmFtZX19IC0tPlxuICAgICAgICAgICAgICAgICAgPCEtLSA8L29wdGlvbj4gLS0+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAqbmdJZj1cImdldEZpZWxkVGVtcGxhdGUoKSBhcyB0ZW1wbGF0ZTsgZWxzZSBkZWZhdWx0RmllbGRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogZ2V0RmllbGRDb250ZXh0KHJ1bGUpXCJcbiAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEZpZWxkPlxuICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ2ZpZWxkQ29udHJvbFNpemUnKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1zZWxlY3RcbiAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicnVsZS50ZW1wRmllbGRcIlxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnZmllbGRDb250cm9sJylcIlxuICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VGaWVsZCgkZXZlbnQsIHJ1bGUpXCJcbiAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG5nLW9wdGlvblxuICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZ2V0RmllbGRzKHJ1bGUuZW50aXR5KVwiXG4gICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJmaWVsZC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt7IGZpZWxkLm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgIDwvbmctb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbmctc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgKm5nSWY9XCJnZXRPcGVyYXRvclRlbXBsYXRlKCkgYXMgdGVtcGxhdGU7IGVsc2UgZGVmYXVsdE9wZXJhdG9yXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IGdldE9wZXJhdG9yQ29udGV4dChydWxlKVwiXG4gICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRPcGVyYXRvcj5cbiAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdvcGVyYXRvckNvbnRyb2xTaXplJylcIj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzc05hbWVzKCdvcGVyYXRvckNvbnRyb2wnKVwiXG4gICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInJ1bGUub3BlcmF0b3JcIlxuICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlT3BlcmF0b3IocnVsZSlcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcGVyYXRvciBvZiBnZXRPcGVyYXRvcnMocnVsZS5maWVsZClcIlxuICAgICAgICAgICAgICAgICAgICBbbmdWYWx1ZV09XCJvcGVyYXRvclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt7IG9wZXJhdG9yIH19XG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICpuZ0lmPVwiZmluZFRlbXBsYXRlRm9yUnVsZShydWxlKSBhcyB0ZW1wbGF0ZTsgZWxzZSBkZWZhdWx0SW5wdXRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogZ2V0SW5wdXRDb250ZXh0KHJ1bGUpXCJcbiAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdElucHV0PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnaW5wdXRDb250cm9sU2l6ZScpXCJcbiAgICAgICAgICAgICAgICBbbmdTd2l0Y2hdPVwiZ2V0SW5wdXRUeXBlKHJ1bGUuZmllbGQsIHJ1bGUub3BlcmF0b3IpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnaW5wdXRDb250cm9sJylcIlxuICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJydWxlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZUlucHV0KClcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInc3RyaW5nJ1wiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ2lucHV0Q29udHJvbCcpXCJcbiAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicnVsZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VJbnB1dCgpXCJcbiAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ2lucHV0Q29udHJvbCcpXCJcbiAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicnVsZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VJbnB1dCgpXCJcbiAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnaW5wdXRDb250cm9sJylcIlxuICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJydWxlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZUlucHV0KClcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCIndGltZSdcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRpbWVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnaW5wdXRDb250cm9sJylcIlxuICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJydWxlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZUlucHV0KClcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInY2F0ZWdvcnknXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHQgb2YgZ2V0T3B0aW9ucyhydWxlLmZpZWxkKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1ZhbHVlXT1cIm9wdC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt7IG9wdC5uYW1lIH19XG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInbXVsdGlzZWxlY3QnXCI+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ2lucHV0Q29udHJvbCcpXCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJydWxlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlSW5wdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0IG9mIGdldE9wdGlvbnMocnVsZS5maWVsZClcIlxuICAgICAgICAgICAgICAgICAgICAgIFtuZ1ZhbHVlXT1cIm9wdC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBvcHQubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygnaW5wdXRDb250cm9sJylcIlxuICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJydWxlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZUlucHV0KClcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInYm9vbGVhbidcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPHF1ZXJ5LWJ1aWxkZXJcbiAgICAgICAgICAgICpuZ0lmPVwibG9jYWwucnVsZXNldFwiXG4gICAgICAgICAgICBbZGF0YV09XCJydWxlXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbcGFyZW50VG91Y2hlZENhbGxiYWNrXT1cInBhcmVudFRvdWNoZWRDYWxsYmFjayB8fCBvblRvdWNoZWRDYWxsYmFja1wiXG4gICAgICAgICAgICBbcGFyZW50Q2hhbmdlQ2FsbGJhY2tdPVwicGFyZW50Q2hhbmdlQ2FsbGJhY2sgfHwgb25DaGFuZ2VDYWxsYmFja1wiXG4gICAgICAgICAgICBbcGFyZW50SW5wdXRUZW1wbGF0ZXNdPVwicGFyZW50SW5wdXRUZW1wbGF0ZXMgfHwgaW5wdXRUZW1wbGF0ZXNcIlxuICAgICAgICAgICAgW3BhcmVudE9wZXJhdG9yVGVtcGxhdGVdPVwiXG4gICAgICAgICAgICAgIHBhcmVudE9wZXJhdG9yVGVtcGxhdGUgfHwgb3BlcmF0b3JUZW1wbGF0ZVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFtwYXJlbnRGaWVsZFRlbXBsYXRlXT1cInBhcmVudEZpZWxkVGVtcGxhdGUgfHwgZmllbGRUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbcGFyZW50RW50aXR5VGVtcGxhdGVdPVwicGFyZW50RW50aXR5VGVtcGxhdGUgfHwgZW50aXR5VGVtcGxhdGVcIlxuICAgICAgICAgICAgW3BhcmVudFN3aXRjaEdyb3VwVGVtcGxhdGVdPVwiXG4gICAgICAgICAgICAgIHBhcmVudFN3aXRjaEdyb3VwVGVtcGxhdGUgfHwgc3dpdGNoR3JvdXBUZW1wbGF0ZVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFtwYXJlbnRCdXR0b25Hcm91cFRlbXBsYXRlXT1cIlxuICAgICAgICAgICAgICBwYXJlbnRCdXR0b25Hcm91cFRlbXBsYXRlIHx8IGJ1dHRvbkdyb3VwVGVtcGxhdGVcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICBbcGFyZW50UmVtb3ZlQnV0dG9uVGVtcGxhdGVdPVwiXG4gICAgICAgICAgICAgIHBhcmVudFJlbW92ZUJ1dHRvblRlbXBsYXRlIHx8IHJlbW92ZUJ1dHRvblRlbXBsYXRlXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgW3BhcmVudEVtcHR5V2FybmluZ1RlbXBsYXRlXT1cIlxuICAgICAgICAgICAgICBwYXJlbnRFbXB0eVdhcm5pbmdUZW1wbGF0ZSB8fCBlbXB0eVdhcm5pbmdUZW1wbGF0ZVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFtwYXJlbnRBcnJvd0ljb25UZW1wbGF0ZV09XCJcbiAgICAgICAgICAgICAgcGFyZW50QXJyb3dJY29uVGVtcGxhdGUgfHwgYXJyb3dJY29uVGVtcGxhdGVcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICBbcGFyZW50VmFsdWVdPVwiZGF0YVwiXG4gICAgICAgICAgICBbY2xhc3NOYW1lc109XCJjbGFzc05hbWVzXCJcbiAgICAgICAgICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICAgICAgICAgIFthbGxvd1J1bGVzZXRdPVwiYWxsb3dSdWxlc2V0XCJcbiAgICAgICAgICAgIFthbGxvd0NvbGxhcHNlXT1cImFsbG93Q29sbGFwc2VcIlxuICAgICAgICAgICAgW2VtcHR5TWVzc2FnZV09XCJlbXB0eU1lc3NhZ2VcIlxuICAgICAgICAgICAgW29wZXJhdG9yTWFwXT1cIm9wZXJhdG9yTWFwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9xdWVyeS1idWlsZGVyPlxuXG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgZ2V0RW1wdHlXYXJuaW5nVGVtcGxhdGUoKSBhcyB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgZWxzZSBkZWZhdWx0RW1wdHlXYXJuaW5nXG4gICAgICAgICAgICBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2NhbC5pbnZhbGlkXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBnZXRFbXB0eVdhcm5pbmdDb250ZXh0KClcIlxuICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEVtcHR5V2FybmluZz5cbiAgICAgICAgICAgIDxwIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZXMoJ2VtcHR5V2FybmluZycpXCIgKm5nSWY9XCJsb2NhbC5pbnZhbGlkXCI+XG4gICAgICAgICAgICAgIHt7IGVtcHR5TWVzc2FnZSB9fVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC91bD5cbjwvZGl2PlxuIl19