export function getEquipment(armor) {

    let weight = 0;
    let poise = 0;


    Object.values(armor).forEach(item => {

        if (item) {

            weight += item.weight;
            poise += item.poise;

        }

    });


    return {
        weight,
        poise
    };

}



export function getRoll(weight, endurance = 20) {

    const load =
        endurance * 2;


    const percent =
        (weight / load) * 100;


    if (percent <= 25)
        return "Light";


    if (percent <= 50)
        return "Medium";


    return "Heavy";

}