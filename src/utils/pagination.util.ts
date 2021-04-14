import { FindConditions, FindManyOptions, Repository } from "typeorm"

const DEFAULT_PAGE_NO = 1
const DEFAULT_PAGE_SIZE = 10

export interface PaginationOptions<T> {
    pageNo: number | string;
    pageSize: number | string;
    orderBy?: keyof T;
    orderValue?: 'DESC' | 'ASC';
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
    value: string | number,
    defaultValue: number
): number {
    const resolvedValue = Number(value);

    if(Number.isInteger(resolvedValue) && resolvedValue >= 0)
    return resolvedValue
    
    return defaultValue
}

export async function pagination<T>(
    repository: Repository<T>,
    {pageSize, pageNo, orderBy, orderValue, ...options}: (FindConditions<T> | FindManyOptions<T>) & Partial<PaginationOptions<T>>
): Promise<Pagination<T>> {

    const _pageSize = resolveNumbericOption(pageSize, DEFAULT_PAGE_SIZE)
    const _pageNo = resolveNumbericOption(pageNo, DEFAULT_PAGE_NO)
    const order: {
        [P in keyof T]?: 'DESC' | 'ASC'
    } = {}
    
    if (orderBy) {
        order[orderBy] = orderValue
    }

    if (_pageNo < 1) {
        return  createPaginationObject([], 0, _pageNo, _pageSize)
    }
    const [list, total] = await repository.findAndCount({
        skip: _pageSize * (_pageNo - 1),
        take: _pageSize,
        where: [options],
        order
    })

    return createPaginationObject(list, total, _pageNo, _pageSize)
}