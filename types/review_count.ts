import type { RuntimeMessageAction, RuntimeType } from "./runtime_types"

export interface ReviewCountRuntimeMessage {
  type: RuntimeType.CONTENT_SCRIPT
  action: RuntimeMessageAction.GET_REVIEW_COUNT
  data: {
    count: number
  }
}
