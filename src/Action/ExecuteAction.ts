import { AssociatedInputs } from '../Enum/AssociatedInputs.ts';
import { HasMenuActions } from '../Support/HasMenuActions.ts';
import { AbstractAction } from './AbstractAction.ts';
import type { SubmitActionData } from './Submit/SubmitActionData.ts';

/**
 * Gathers input values, merges them with the `data` property if specified, and sends them to the
 * Bot via an Invoke activity. The Bot can respond synchronously and return an updated Adaptive Card
 * to be displayed by the client. `Action.Execute` works in all Adaptive Card hosts.
 */
export class ExecuteAction extends AbstractAction {
    private readonly hasMenuActions = new HasMenuActions(this);

    public constructor(title: string | null = null) {
        super();
        if (title !== null) {
            this.title(title);
        }
    }

    public static make(title: string | null = null): ExecuteAction {
        return new ExecuteAction(title);
    }

    /**
     * Add actions to display in the overflow menu of a Split action button.
     */
    public addMenuActions(action: AbstractAction | Iterable<AbstractAction>): this {
        return this.hasMenuActions.addMenuActions(action);
    }

    /**
     * The actions to display in the overflow menu of a Split action button.
     * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
     * "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
     */
    public menuActions(actions: Iterable<AbstractAction>): this {
        return this.hasMenuActions.menuActions(actions);
    }

    /**
     * The verb of the action.
     */
    public verb(verb: string): this {
        return this.set('verb', verb);
    }

    /**
     * The data to send to the Bot when the action is executed. When expressed as an object, `data` is sent
     * back to the Bot when the action is executed, adorned with the values of the inputs expressed as
     * key/value pairs, where the key is the Id of the input. If `data` is expressed as a string, input
     * values are not sent to the Bot.
     * Valid values: `SubmitActionData`.
     */
    public data(data: SubmitActionData): this {
        return this.set('data', data);
    }

    /**
     * The Ids of the inputs associated with the `Action.Submit`. When the action is executed, the
     * values of the associated inputs are sent to the Bot.
     * Valid values: "auto", "none".
     */
    public associatedInputs(associatedInputs: AssociatedInputs): this {
        return this.set('associatedInputs', associatedInputs);
    }

    /**
     * Controls if the action is enabled only if at least one required input has been filled by the user.
     */
    public conditionallyEnabled(enabled: boolean = true): this {
        return this.set('conditionallyEnabled', enabled);
    }

    public getType(): string {
        return 'Action.Execute';
    }
}
