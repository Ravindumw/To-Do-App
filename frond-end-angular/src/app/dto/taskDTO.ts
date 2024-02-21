export class TaskDTO {

  constructor(public id: number | null,
              public description: string,
              public status: boolean | null,
              public email: string) {
  }
}
