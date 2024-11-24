const BASE_URL = `api`;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getData<T>(url: string): Promise<T> {
  await delay(500);

  const reponse = await fetch(BASE_URL + url);

  if (!reponse.ok) {
    throw new Error(`${reponse.status}`);
  }

  return reponse.json();
}
