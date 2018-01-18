# *neaps* - no estimates agile process simulator

## a simulator to forecast the end of agile project basing on historical data and using montecarlo simulations

This repository contains the *neaps* logic written in python using [numpy](http://www.numpy.org/).
It is currently implemented in a basic API based on [flask](http://flask.pocoo.org/).

### The API
The API implements two endpoints:
- `/api` which is the endpoint to run a simulation;
- `/check` which is a simple healthcheck for the service.

Here follows a commented sample of request to send at the `/api` endpoint, through a POST request.

``` json
{
  "chunks":
  [
    {
      "sample":"5,6,7",
      "runsdim":10,
      "wip":2,
      "td_low_bound":0.1,
      "td_high_bound":0.3
    },
    {
      "sample":"5,6,7",
      "runsdim":10,
      "wip":2,
      "td_low_bound":0.0,
      "td_high_bound":0.0
    }
  ],
  "predstot":2000,
  "runstot":50000,
  "fun":0
}
```

The request keys and values are:
- `fun`: the type of simulation to run, accepted values are:
  - `0`: kanban simulation -> how many days I need to develop a given number of user stories;
  - `1`: kanban simulation -> how many user stories I can develop in a given number of days;
  - `2`: scrum simulation -> how many sprint I need to develop a given number of story points/number of stories;
- `runstot`: the total number of montecarlo simulations to run;
- `predstot`: the total number of statistical bootstraps to calculate; 
- `chunk`: array containing defined parts of simulation;
  - `sample`: a historical sample of:
    - `fun 0 and 1`: cycle time of user stories;
    - `fun 2`: sprint throughput/sprint velocity; 
  - `runsdim`: the target of the simulation, expressed in:
    - `fun 0`: number of user stories to develop;
    - `fun 1`: number of days available to develop;
    - `fun 2`: number of stories to develop/story points to develop; 
  - `wip`: number of stories the team can develop at the same time (only for kanban simulations);
  - `td_low_bound`: the lower bound of tech debt created expressed in % of target;
  - `td_high_bound`: the upper bound of tech debt created expressed in % of target;

### How to run locally
Clone the repository and install python 3.
Then in the repository directory run the following commands:

``` shell
python3 -m venv env

source configure.sh

pip install -r requirements.txt

flask run
```

Using a python virtual environment is highly reccomended.

To deactivate the environemnt once run use the `deativate` cli command.
