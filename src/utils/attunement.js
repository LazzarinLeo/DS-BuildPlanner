export function getSpellSlots(attunement) {

    if (attunement < 10)
        return 0;

    if (attunement < 14)
        return 1;

    if (attunement < 18)
        return 2;

    if (attunement < 24)
        return 3;

    if (attunement < 30)
        return 4;

    if (attunement < 40)
        return 5;

    return 6;

}