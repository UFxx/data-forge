import { type BaseResponse } from "./baseResponse"

export interface LoginForm
{
	login    : string | null,
	password : string | null
}

export interface LoginFormResponse extends BaseResponse
{
	login   : string,
	token   : string
}