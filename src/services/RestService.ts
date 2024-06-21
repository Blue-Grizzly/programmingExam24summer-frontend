import { handleHttpErrors, makeOptions } from "./fetchUtils";


class RestService {
  private url: string;
  constructor() {
    this.url = 'http://localhost:8080';
  }

  public async getAll(entity: string){
    return await fetch(`${this.url}/${entity}`).then(handleHttpErrors);
  }

  public async getById(entity: string, id: number) {
    return await fetch(`${this.url}/${entity}/${id}`).then(handleHttpErrors);
  }

  public async create(entity: string, data: any) {
    const method = data.id ? 'PUT' : 'POST';
    return await fetch(`${this.url}/${data.id? entity+"/"+data.id : entity}`, makeOptions(method, data, true)).then(handleHttpErrors);
  }

  public async delete(entity: string, id: number) {
    return await fetch(`${this.url}/${entity}/${id}`, makeOptions('DELETE', null, true)).then((res) => res.ok);
  }

}

export default new RestService();