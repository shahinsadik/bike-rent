// @types/http-status/index.d.ts
declare module 'http-status' {
    export type HttpStatus = {
      [key: string]: number;
    };
  
    const httpStatus: HttpStatus;
  
    export default httpStatus;
  
    export function getStatusText(statusCode: number): string;
  }
  