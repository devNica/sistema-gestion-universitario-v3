export interface DatabaseOutputPort {
  connect: () => Promise<void>
  syncModels?: (alter: boolean) => Promise<void>
}
