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
| Name        | Type    | Required | Values Allowed                    | default values | Description                                                                      |
| ----------- | ------- | -------- | --------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| phases      | array   | true     | see phases                        | does not apply | Each phase for timeline                                                          |
#### phases
| Name        | Type    | Required | Values Allowed                    | default values | Description                                                                      |
| ----------- | ------- | -------- | --------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| name        | string  | true     | Any string                        | does not apply | Name of phase for timeline                                                       |
| dateFrom    | string  | true     | `YYYY-MM-DD`                      | does not apply | Starting date of phase                                                           |
| dateTo      | string  | true     | `YYYY-MM-DD`                      | does not apply | Starting date of phase                                                           |
| overlapping | boolean | false    | True or False                     | False          | True on any phase that overlaps other phase                                      |
| gates       | array   | false    | edu objects                       | does not apply | Extra info for educational                                                       |


### Educational
| Name        | Type    | Required | Values Allowed                    | default values | Description                                                                      |
| ----------- | ------- | -------- | --------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| key         | integer | true     | any integer                       | does not apply | Number of educational table, only for visual numbering                           |
| edu         | object  | true     | see Educational.edu               | does not apply | Info for each educational tile needs edu object                                  |
| activeColor | string  | true     | hex value for color               | does not apply | What color to set as accent color                                                |


#### edu
| Name        | Type    | Required | Values Allowed                    | default values | Description                                                                      |
| ----------- | ------- | -------- | --------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| name        | string  | true     | Any string                        | does not apply | Name of educational tile                                                         |
| text        | string  | true     | Any string                        | does not apply | Info text for til                                                                |
| myrole      | string  | false    | Any string                        | does not apply | Extra text info for tile                                                         |
| time_limits | string  | false    | Any string                        | does not apply | Extra text info for tile                                                         |
| info        | array   | false    | {text: `string`, link: `<url>`}   | does not apply | Links to other sources                                                           |

### TimeAndEdu
| Name        | Type    | Required | Values Allowed                    | default values | Description                                                                      |
| ----------- | ------- | -------- | --------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| data        | object  | true     | plan: {phases: array} with gates  | does not apply | Name of educational tile                                                         |