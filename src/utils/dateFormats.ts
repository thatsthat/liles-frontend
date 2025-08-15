export function dataBackToFront(data: string) {
  const dataHoraSplit = data.split("T");
  // Return only date part of the string
  return dataHoraSplit[0];
}

export function dataHoraBackToFront(dataHora: string) {
  const dataHoraSplit = dataHora.split("T");
  const data = dataHoraSplit[0];
  const digitsHora = dataHoraSplit[1].split(":");
  const hora = digitsHora[0] + ":" + digitsHora[1];
  return { data: data, hora: hora };
}

export function dataHoraFrontToBack(data: string, hora: string) {
  return data + "T" + hora + ":00Z";
}

export function dataFrontToBack(data: string, hora: string) {
  return data + "T00:00:00Z";
}
