export class TaskDTO {

  constructor(public id: number | null | string,
              public description: string,
              public status: boolean | null,
              public email: string) {
  }
}
