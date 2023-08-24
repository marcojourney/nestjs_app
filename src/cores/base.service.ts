export class BaseService {
    protected responses(datas: any[], total: number, limit: number, offset: number) {
        return { data: datas, metadata: { total, limit, offset } };
    }

    protected responseSuccess() {
        return { message: 'MESSAGE.OK' };
    }
}
