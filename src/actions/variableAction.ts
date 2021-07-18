import { ActionType, HttpRegionAction, ProcessorContext, VariableType } from '../models';
import { httpYacApi } from '../httpYacApi';
import { log } from '../io';


export class VariableAction implements HttpRegionAction {
  type = ActionType.variable;

  constructor(private readonly data: Record<string, string>) {}


  async process(context: ProcessorContext) : Promise<boolean> {
    let result = true;
    if (this.data) {
      context.cancelVariableReplacer = () => {
        result = false;
      };
      for (const [key, value] of Object.entries(this.data)) {
        if (result) {
          context.variables[key] = await replaceVariables(value, VariableType.variable, context);
        }
      }
    }
    return result;
  }
}


export async function replaceVariables(text: string, type: VariableType | string, context: ProcessorContext): Promise<string | undefined> {
  let result: string | undefined = text;
  for (const variableReplacer of httpYacApi.variableReplacers) {
    if (result) {
      log.trace(`replacer ${variableReplacer.type} executing`);
      result = await variableReplacer.replace(result, type, context);
    }
  }
  return result;
}
