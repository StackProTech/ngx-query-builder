import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import * as i0 from '@angular/core';
import { Directive, Input, forwardRef, Component, ViewChild, ContentChild, ContentChildren, NgModule } from '@angular/core';
import * as i1 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class QueryOperatorDirective {
    constructor(template) {
        this.template = template;
    }
}
QueryOperatorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryOperatorDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryOperatorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryOperatorDirective, selector: "[queryOperator]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryOperatorDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryOperator]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class QueryFieldDirective {
    constructor(template) {
        this.template = template;
    }
}
QueryFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryFieldDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryFieldDirective, selector: "[queryField]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryFieldDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryField]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class QueryEntityDirective {
    constructor(template) {
        this.template = template;
    }
}
QueryEntityDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryEntityDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryEntityDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryEntityDirective, selector: "[queryEntity]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryEntityDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryEntity]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class QuerySwitchGroupDirective {
    constructor(template) {
        this.template = template;
    }
}
QuerySwitchGroupDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QuerySwitchGroupDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QuerySwitchGroupDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QuerySwitchGroupDirective, selector: "[querySwitchGroup]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QuerySwitchGroupDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[querySwitchGroup]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class QueryButtonGroupDirective {
    constructor(template) {
        this.template = template;
    }
}
QueryButtonGroupDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryButtonGroupDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryButtonGroupDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryButtonGroupDirective, selector: "[queryButtonGroup]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryButtonGroupDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryButtonGroup]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class QueryInputDirective {
    constructor(template) {
        this.template = template;
    }
    /** Unique name for query input type. */
    get queryInputType() { return this._type; }
    set queryInputType(value) {
        // If the directive is set without a type (updated programatically), then this setter will
        // trigger with an empty string and should not overwrite the programatically set value.
        if (!value) {
            return;
        }
        this._type = value;
    }
}
QueryInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryInputDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryInputDirective, selector: "[queryInput]", inputs: { queryInputType: "queryInputType" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryInputDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryInput]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { queryInputType: [{
                type: Input
            }] } });

class QueryRemoveButtonDirective {
    constructor(template) {
        this.template = template;
    }
}
QueryRemoveButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryRemoveButtonDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryRemoveButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryRemoveButtonDirective, selector: "[queryRemoveButton]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryRemoveButtonDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryRemoveButton]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class QueryEmptyWarningDirective {
    constructor(template) {
        this.template = template;
    }
}
QueryEmptyWarningDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryEmptyWarningDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryEmptyWarningDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryEmptyWarningDirective, selector: "[queryEmptyWarning]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryEmptyWarningDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryEmptyWarning]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class QueryArrowIconDirective {
    constructor(template) {
        this.template = template;
    }
}
QueryArrowIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryArrowIconDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryArrowIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryArrowIconDirective, selector: "[queryArrowIcon]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryArrowIconDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryArrowIcon]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

const CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QueryBuilderComponent),
    multi: true,
};
const VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => QueryBuilderComponent),
    multi: true,
};
class QueryBuilderComponent {
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

class Angular2QueryBuilderModule {
}
Angular2QueryBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
Angular2QueryBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, declarations: [QueryBuilderComponent,
        QueryInputDirective,
        QueryOperatorDirective,
        QueryFieldDirective,
        QueryEntityDirective,
        QueryButtonGroupDirective,
        QuerySwitchGroupDirective,
        QueryRemoveButtonDirective,
        QueryEmptyWarningDirective,
        QueryArrowIconDirective], imports: [NgSelectModule,
        CommonModule,
        FormsModule], exports: [QueryBuilderComponent,
        QueryInputDirective,
        QueryOperatorDirective,
        QueryFieldDirective,
        QueryEntityDirective,
        QueryButtonGroupDirective,
        QuerySwitchGroupDirective,
        QueryRemoveButtonDirective,
        QueryEmptyWarningDirective,
        QueryArrowIconDirective] });
Angular2QueryBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, imports: [[
            NgSelectModule,
            CommonModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NgSelectModule,
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        QueryBuilderComponent,
                        QueryInputDirective,
                        QueryOperatorDirective,
                        QueryFieldDirective,
                        QueryEntityDirective,
                        QueryButtonGroupDirective,
                        QuerySwitchGroupDirective,
                        QueryRemoveButtonDirective,
                        QueryEmptyWarningDirective,
                        QueryArrowIconDirective
                    ],
                    exports: [
                        QueryBuilderComponent,
                        QueryInputDirective,
                        QueryOperatorDirective,
                        QueryFieldDirective,
                        QueryEntityDirective,
                        QueryButtonGroupDirective,
                        QuerySwitchGroupDirective,
                        QueryRemoveButtonDirective,
                        QueryEmptyWarningDirective,
                        QueryArrowIconDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of angular2-query-builder
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Angular2QueryBuilderModule, CONTROL_VALUE_ACCESSOR, QueryArrowIconDirective, QueryBuilderComponent, QueryButtonGroupDirective, QueryEmptyWarningDirective, QueryEntityDirective, QueryFieldDirective, QueryInputDirective, QueryOperatorDirective, QueryRemoveButtonDirective, QuerySwitchGroupDirective, VALIDATOR };
//# sourceMappingURL=angular2-query-builder.js.map
