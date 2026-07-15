export function calculateLevel(player) {

    let level = player.level;


    Object.keys(player.stats).forEach(stat => {

        const diff =
            player.stats[stat] -
            player.baseStats[stat];


        if (diff > 0) {
            level += diff;
        }

    });


    return level;

}