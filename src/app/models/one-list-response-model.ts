import { ResponseModel } from "./response-model";

export interface OneListResponseModel<T> extends ResponseModel{
    data:T

}