# *neaps* - no estimates agile process simulator

## a simulator to forecast the end of agile project basing on historical data and using montecarlo simulations

---

# Start using

![Getting started.](screenshot.png "A screenshot of neaps with showing a basic simulation.")

You can easily run it locally by referring at the `readme.md` found in [`neaps-spa`](https://github.com/HotelsDotCom/neaps/blob/master/neaps-spa/README.md) and [`neaps-api`](https://github.com/HotelsDotCom/neaps/blob/master/neaps-api/readme.md) directories.

# Overview
NEAPS is a montecarlo simulator which estimates the deadline of agile projects, starting from historical data.

Currently the projects supports thrre types of simulation:
- for kanban projects esitmates the number of days required to complete a given number of stories (starting from a cycle time sample);
- for kanban projects estimates the number of stories done in a given time frame (starting from a cycle time sample);
- for scrum projects estimates the number of sprint required to complete a given number of stories (starting from a throughput sample).

# Documentation
Please refer to the `readme.md` found in `neaps-spa` and `neaps-api` directories.

# Credits
Created by [Giuseppe Sorrentino](https://github.com/glsorre).

# Legal
This project is available under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

Copyright 2018 Expedia Inc.