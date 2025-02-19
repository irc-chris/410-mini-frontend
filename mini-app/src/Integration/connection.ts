class Client2ServerAdapter {
    constructor() {}
  
    /**
     * Initializes the adapter by negotiating a connection with the backend.
     * Fetches connection details and sets up managers for rooms and messages.
     */
    async initialize() {
      console.log("Initializing adapter...");
      await fetch("https://warm-up-a.azurewebsites.net/api/negotiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Negotiation failed: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((json) => {
          console.log("Negotiation successful:", json);
  
          const connectionUrl = json.Url;
          const accessToken = json.AccessToken;
  
          if (!connectionUrl || !accessToken) {
            throw new Error("Negotiation response is missing required fields.");
          }
          
        })
        .catch((error) => {
          // Handle errors at any step of the promise chain
          console.error("Negotiation failed:", error);
        });
    }
}




const client2ServerAdapter = new Client2ServerAdapter();
export default client2ServerAdapter;