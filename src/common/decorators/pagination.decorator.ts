import { createParamDecorator, ExecutionContext } from "@nestjs/common"


export interface PaginationParam {
    order?: any
    take?: number
    skip?: number
}

function resolveNumbericOption (value: string | number, defaultValue: number): number {
    const resolvedValue = Number(value);
    if (Number.isInteger(resolvedValue) && resolvedValue >= 0)
    return resolvedValue
    return defaultValue
}

export const SearchParam = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // 请求参数
        const { pageNo, pageSize, orderBy, ...query } = request.query

        const searchParam: PaginationParam = {}
        
        searchParam.take = resolveNumbericOption(pageSize, 10)
        searchParam.skip = searchParam.take * (resolveNumbericOption(pageNo, 10) - 1)

        if (orderBy) {
            const parts = orderBy.split('_')
            const key = parts[0]
            const value: 'ASC' | 'DESC' = parts[1] as 'ASC' | 'DESC'
            searchParam.order = {
                [key]: value
            }
        }

        return { query, searchParam }
    }
)