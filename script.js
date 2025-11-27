// Rozpoczynamy od funkcji asynchronicznej
async function zlozOferte() {

    // Krok 1: Dynamiczne pobieranie tokenu CSRF
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : null;

    if (!csrfToken) {
        return;
    }

    // ---

    // Krok 2: Pobieranie i czyszczenie liczby diamentów
    const diamondsElement = document.querySelector('div.value.renew-points');
    let points = 0;

    if (diamondsElement) {
        // Spróbuj wydobyć liczbę z tekstu
        const textContent = diamondsElement.textContent || '';
        const match = textContent.match(/(\d[\d\s]*\d|\d+)/); // Ulepszone dopasowanie liczby ze spacjami

        if (match) {
            // USUNIĘCIE WSZYSTKICH SPACJI PRZED KONWERSJĄ
            const cleanedNumberString = match[0].replace(/\s/g, ''); 
            points = parseInt(cleanedNumberString, 10);
        }
    }

    if (points <= 0) {
        return;
    }
    
    // Zmniejszamy ofertę o 1, aby zostawić rezerwę diamentów
    const pointsToBid = points - 1; 

    if (pointsToBid < 100) {
        return;
    }


    // ---

    // Krok 3: Przygotowanie i wysłanie żądania POST
    const url = 'https://s3.polskamafia.pl/map/building/pointsAuction/storeAuction';
    
    const data = new URLSearchParams();
    data.append('startingBid', '100');
    data.append('pointsAmount', pointsToBid.toString());
    data.append('hoursAmount', '1');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: data
        });

        if (!response.ok) {
            return;
        }

        const jsonResponse = await response.json();

    } catch (error) {
    }

}

// Uruchomienie głównej funkcji
zlozOferte();
