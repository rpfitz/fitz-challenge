const API_URL = `http://localhost:3000/record`;

export const customEnvironment = {
  RECORD_API_URL: `${API_URL}`,
  REGISTER_RECORD_ENDPOINT_EXAMPLE: `${API_URL}/${'COLLABORATOR_VARIABLE'}/registrar`,
  GET_RECORDS_API_URL: `${API_URL}/registros`,
  VALIDATE_RECORD_ENDPOINT_EXAMPLE: `${API_URL}/${'ID_VARIABLE'}/validar`,
}
