const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

// Authentication details (to be filled in)
const tenantId = "YOUR_TENANT_ID";
const clientId = "YOUR_CLIENT_ID";
const clientSecret = "YOUR_CLIENT_SECRET";

// Get access token
async function getAccessToken() {
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            scope: 'https://graph.microsoft.com/.default'
        })
    });
    const data = await response.json();
    return data.access_token;
}

// Create calendar event
async function createEvent() {
    try {
        const token = await getAccessToken();
        const client = Client.init({ authProvider: (done) => done(null, token) });

        const event = {
            subject: "Demo Samo Event, Managing Parties!🌟",
            start: { dateTime: "2025-12-11T10:00:00", timeZone: "Pacific Standard Time" },
            end: { dateTime: "2025-12-11T11:00:00", timeZone: "Pacific Standard Time" },
            body: { content: "This fun demo-event was created via Microsoft Graph! It shows my birthday date, so you won't forget 😊", contentType: "text" }
        };

        await client.api('/me/events').post(event);
        console.log("Event created successfully! 📅");
    } catch (error) {
        console.error("Oops! Something went wrong, we are sad:", error.message);
    }
}

// Run the function
createEvent();