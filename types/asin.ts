import type { RuntimeMessageAction, RuntimeType } from "./runtime_types"

export interface AsinRuntimeMessage {
  type: RuntimeType.CONTENT_SCRIPT
  action: RuntimeMessageAction.GET_ASIN
  data: {
    asin: string
  }
}
