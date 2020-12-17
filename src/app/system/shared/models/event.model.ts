export class WFMEvent {
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public date: string,
    public description: string,
    public id?: number,
    public catName?: string
  ) {
  }

}

/*
"type": "outcome",
    "amount": 2470,
    "category": 2,
    "date": "17.06.2017 14:00:58",
    "id": 4,
    "description": "Закупка на неделю"
* */
