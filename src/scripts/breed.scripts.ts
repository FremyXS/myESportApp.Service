import osmosis from "osmosis";

export class Breed {
    private HOST_DOGS = "https://lapkins.ru/dog/";

    constructor() {
    }

    public async getDogs(): Promise<any> {
        return new Promise((resolve, reject) => {
            let response = [];
            osmosis
                .get(encodeURI(this.HOST_DOGS))
                .find(".poroda-element")
                .set({
                    name: "span",
                    image: "img@src"
                })
                .data(data => {
                    response.push({
                        name: data.name,
                        image: "https://lapkins.ru/" + data.image
                    })
                })
                .done(() => resolve(response))
                .error(() => reject("Ошибка при парсинге пород"))
        })
    }
}