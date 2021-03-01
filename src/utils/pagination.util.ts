import { FindConditions, FindManyOptions, Repository } from "typeorm"

const DEFAULT_PAGE_NO = 1
const DEFAULT_PAGE_SIZE = 10

export interface PaginationOptions {
    pageNo: number | string;
    pageSize: number | string;
}

export class Pagination<PaginationObject> {
    constructor(
        public readonly list: PaginationObject[],
        public readonly itemCount: number,
        public readonly total: number,
        public readonly totalPages: number,
        public readonly pageNo: number,
        public readonly pageSize: number,
    ){}
}

function createPaginationObject<T>(
    list: T[],
    total: number,
    pageNo: number,
    pageSize: number
): Pagination<T> {
    const totalPages = Math.ceil(total / pageSize)
    return new Pagination(list, list.length, total, totalPages, pageNo, pageSize)
}

function resolveNumbericOption(
    options: Partial<PaginationOptions>,
    key: 'pageNo' | 'pageSize',
    defaultValue: number
): number {
    const value = options[key];
    const resolvedValue = Number(value);

    if(Number.isInteger(resolvedValue) && resolvedValue >= 0)
    return resolvedValue
    
    console.warn(`分页参数${key}的值${value}不合法，请进行校验`)
    return defaultValue
}

export async function pagination<T>(
    repository: Repository<T>,
    options: (FindConditions<T> | FindManyOptions<T>) & Partial<PaginationOptions>
): Promise<Pagination<T>> {

    const pageSize = resolveNumbericOption(options, 'pageSize', DEFAULT_PAGE_SIZE)
    const pageNo = resolveNumbericOption(options, 'pageNo', DEFAULT_PAGE_NO)

    delete options.pageSize
    delete options.pageNo

    if (pageNo < 1) {
        return  createPaginationObject([], 0, pageNo, pageSize)
    }

    const [list, total] = await repository.findAndCount({
        skip: pageSize * (pageNo - 1),
        take: pageSize,
        where: [options]
    })

    return createPaginationObject(list, total, pageNo, pageSize)
}