export const getPuestoDeTrabajo = (candidate) => {
    if (candidate.is_staff && !candidate.is_superuser) {
        return "Gerente";
    }
    if (candidate.last_name) {
        let str = candidate.last_name;
        let words = str.split(" ");
        let puesto = words.find(
            (word) => word === "Frontend" || word === "Backend"
        );
        return puesto;
    } else {
        return "";
    }
};

export const getLastName = (candidate) => {
    if (candidate.last_name) {
        let str = candidate.last_name;
        let words = str.split(" ");
        words.pop();
        return words.join(" ");
    } else {
        return "";
    }
};
