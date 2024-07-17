document.addEventListener('DOMContentLoaded', () => {
    const formulaire = document.getElementById('formulaire');
    const libelle = document.getElementById('libelle');
    const categorie = document.getElementById('categorie');
    const description = document.getElementById('description');
    const regexlibelle = /^[a-zA-Z\s]+$/;
    const regexdescription = /^[a-zA-Z\s]+$/;
    const minlibelle = 5;
    const maxlibelle = 15;
    const mindescription = 5;
    const maxdescription = 100;

    // Tableau pour stocker les données soumises
    const submissions = [];

    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        const erreurlibelle = document.getElementById('libelleError');
        const descriptionError = document.getElementById('descriptionError');

        // Validation pour libelle
        if (libelle.value.trim() === "") {
            erreurlibelle.innerHTML = "Le libellé ne peut pas être vide";
            erreurlibelle.style.color = 'red';
            valid = false;
        } else if (libelle.value.length < minlibelle || libelle.value.length > maxlibelle) {
            erreurlibelle.innerHTML = `Le libellé doit être compris entre ${minlibelle} et ${maxlibelle} caractères`;
            erreurlibelle.style.color = 'red';
            valid = false;
        } else if (!regexlibelle.test(libelle.value)) {
            erreurlibelle.innerHTML = "Le libellé ne doit pas contenir de chiffres";
            erreurlibelle.style.color = 'red';
            valid = false;
        } else {
            erreurlibelle.innerHTML = "";
        }

        // Validation pour description
        if (description.value.trim() === "") {
            descriptionError.innerHTML = "La description ne peut pas être vide";
            descriptionError.style.color = 'red';
            valid = false;
        } else if (description.value.length < mindescription || description.value.length > maxdescription) {
            descriptionError.innerHTML = `La description doit être comprise entre ${mindescription} et ${maxdescription} caractères`;
            descriptionError.style.color = 'red';
            valid = false;
        } else if (!regexdescription.test(description.value)) {
            descriptionError.innerHTML = "La description ne doit pas contenir de chiffres ni de caractères spéciaux";
            descriptionError.style.color = 'red';
            valid = false;
        } else {
            descriptionError.innerHTML = "";
        }

        // Si tout est valide, ajouter les données au tableau et les afficher
        if (valid) {
            const submission = {
                libelle: libelle.value,
                categorie: categorie.value,
                description: description.value
            };
            submissions.push(submission);
            displaySubmissions();

            // Réinitialiser le formulaire après soumission
            formulaire.reset();
        }
    });

    // Fonction pour afficher les données soumises
    function displaySubmissions() {
        const dataList = document.getElementById('dataList');
        dataList.innerHTML = ''; // Effacer les anciennes données affichées
        submissions.forEach((submission) => {
            const newItem = document.createElement('div');
            newItem.innerHTML = `
                <strong>Libellé:</strong> ${submission.libelle}<br>
                <strong>Catégorie:</strong> ${submission.categorie}<br>
                <strong>Description:</strong> ${submission.description}
            `;
            dataList.appendChild(newItem);
        });
    }
});
