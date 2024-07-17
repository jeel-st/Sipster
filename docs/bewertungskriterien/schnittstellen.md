# Schnittstellen

* 0 - keine externe Schnittstellen vorhanden
* 2 - CRUD teilweise umgesetzt
* 4 - CRUD-Operationen über externer Schnittstelle bereitgestellt. Bei REST: Korrekte Nutzung der HTTP-Verben und Status-Codes.
* 6 - Dokumentation der Schnittstelle: Doku der Operationen, warum welche Schnittstellenart (synchron/asynchron) eingesetzt?

Da wir für unsere Schnittstelle ausschließlich REST benutzen, handelt es sich hier um eine synchrone Kommunikation. Somit gibt es keine asynchrone Schnittstellenart in unserem Projekt.

Alles weitere über die Schnittstelle zwischen frontend und backend findet sich in unserem Code, beispielsweise unter `sipster/frontend/app/utils/database` sind verschiedenste fetcher zu finden. Diese Anfragen kommen in `sipster/backend/app.js` an und werden dort an die jeweiligen Router weitergeleitet und verarbeitet. Von den jeweiligen Methoden aus, werden die jeweiligen Statuscodes auch wieder zurückgesendet.

Die einzelnen Dokumentationen der REST Endpoint können unter [Backend/Rest API's](../backend/rest-api-s.md) nachgelesen werden.

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption><p>Beispiel für eine fetch- Methode</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption><p>Beispiel für das senden der richigen Statuscodes</p></figcaption></figure>
