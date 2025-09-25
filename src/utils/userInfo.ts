export function loggedIn(): boolean {
  return (
    Date.now() < (localStorage.getItem("currentTokenExpires") as any) * 1000
  );
}

export function getUserId(): number {
  return JSON.parse(localStorage.getItem("currentUser") as string).id;
}

export function userLogOut(): void {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentToken");
  localStorage.removeItem("currentTokenExpires");
}
