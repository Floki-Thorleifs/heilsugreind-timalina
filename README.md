# heilsugreind-timalina

## Installation

Using npm:

```shell
$ npm i heilsugreind-timalina
```

In Node.js:

```js
import { Timeline, Educational, TimeAndEdu } from "heilsugreind-timalina";
```

## Props

### Timeline

| Name   | Type  | Required | Values Allowed | default values | Description             |
| ------ | ----- | -------- | -------------- | -------------- | ----------------------- |
| phases | array | true     | see phases     | does not apply | Each phase for timeline |

#### phases

| Name        | Type    | Required | Values Allowed | default values | Description                                 |
| ----------- | ------- | -------- | -------------- | -------------- | ------------------------------------------- |
| name        | string  | true     | Any string     | does not apply | Name of phase for timeline                  |
| dateFrom    | string  | true     | `YYYY-MM-DD`   | does not apply | Starting date of phase                      |
| dateTo      | string  | true     | `YYYY-MM-DD`   | does not apply | Starting date of phase                      |
| overlapping | boolean | false    | True or False  | False          | True on any phase that overlaps other phase |
| gates       | array   | false    | edu objects    | does not apply | Extra info for educational                  |

### Educational

| Name        | Type    | Required | Values Allowed      | default values | Description                                            |
| ----------- | ------- | -------- | ------------------- | -------------- | ------------------------------------------------------ |
| key         | integer | true     | any integer         | does not apply | Number of educational table, only for visual numbering |
| edu         | object  | true     | see edu             | does not apply | Info for each educational tile needs edu object        |
| activeColor | string  | true     | hex value for color | does not apply | What color to set as accent color                      |

#### edu

| Name        | Type   | Required | Values Allowed                  | default values | Description              |
| ----------- | ------ | -------- | ------------------------------- | -------------- | ------------------------ |
| name        | string | true     | Any string                      | does not apply | Name of educational tile |
| text        | string | true     | Any string                      | does not apply | Info text for til        |
| myrole      | string | false    | Any string                      | does not apply | Extra text info for tile |
| time_limits | string | false    | Any string                      | does not apply | Extra text info for tile |
| info        | array  | false    | {text: `string`, link: `<url>`} | does not apply | Links to other sources   |

### TimeAndEdu

| Name | Type   | Required | Values Allowed                   | default values | Description              |
| ---- | ------ | -------- | -------------------------------- | -------------- | ------------------------ |
| data | object | true     | plan: {phases: array} with gates | does not apply | Name of educational tile |

## Example of data

```json
{
  "plan": {
    "phases": [
      {
        "name": "Lorem Ipsum",
        "overlapping": false,
        "datefrom": "2020-12-18T00:00:00",
        "dateto": "2021-02-17T00:00:00",
        "gates": [
          {
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "name": "Lorem Ipsum",
            "step": 1,
            "myrole": null,
            "time_limits": null,
            "info": [
              {
                "text": "Link to stuff",
                "link": "/test"
              }
            ],
            "dates": [
              {
                "date": "2021-01-26T00:00:00"
              }
            ]
          }
        ]
      },
      {
        "name": "Excepteur sint",
        "overlapping": true,
        "datefrom": "2021-01-18T00:00:00",
        "dateto": "2021-05-17T00:00:00",
        "gates": [
          {
            "text": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "name": "Excepteur sint",
            "step": 1,
            "myrole": null,
            "time_limits": null,
            "info": [
              {
                "text": "Link to stuff",
                "link": "/test"
              }
            ],
            "dates": [
              {
                "date": "2021-02-13T00:00:00"
              }
            ]
          }
        ]
      }
    ]
  }
}
```
