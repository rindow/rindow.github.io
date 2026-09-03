---
layout: document
title: "Reinforcement Learning"
meta_description: "Train reinforcement-learning agents in PHP with Rindow Neural Networks and Rindow RL Agents. Supports DQN, PPO, A2C, DDPG, SAC, REINFORCE, Q-learning and Sarsa with CPU and GPU backends."
upper_section: index
previous_section: autodiff
---

Rindow Neural Networks supports reinforcement learning (RL) through
**Rindow RL Agents**, a collection of reinforcement-learning agents, training
runners, replay storage, and device-aware environment adapters built on top of
Rindow Neural Networks. The implementation runs on both host (CPU) and
accelerator (GPU/OpenCL) linear-algebra backends.

For the full API documentation, samples, and configuration details, see the
**[Rindow RL Agents Reference](/rindow-rl-agents/)**.

Overview
--------
In reinforcement learning, an *agent* interacts with an *environment*: it
observes a state, selects an action, and receives a reward. Rindow RL Agents
provides the agent implementations, while Rindow Neural Networks provides the
neural-network models (policies, Q-networks, actors and critics) that the
agents learn with.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
use Rindow\RL\Agents\Agent\DQN\DQNAgent;
use Rindow\RL\Agents\Agent\DQN\Runner;

$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$la = $nn->backend()->primaryLA();

$agent = new DQNAgent(
    $nn,
    obsDim: 4,
    numActions: 2,
    hiddenLayers: [128, 128],
);

$runner = new Runner(
    $la, $trainingEnv, $evaluationEnv, $agent,
    obsDim: 4,
    bufferSize: 100_000,
);

$history = $runner->train(
    totalSteps: 100_000,
    learningStarts: 1_000,
    trainEvery: 1,
    epsilonStart: 1.0,
    epsilonEnd: 0.05,
    epsilonDecaySteps: 50_000,
    evalEvery: 5_000,
    evalEpisodes: 10,
);
```

The runner owns the interaction loop, storage, evaluation schedule, and
optional best-model checkpoint. Training and evaluation environments are kept
as separate instances so evaluation resets do not disturb the training
trajectory.

Supported agents
----------------
All neural agents receive a Rindow Neural Networks `Builder`. Linear
tile-coded agents receive the active linear-algebra object.

| Agent | Action space | Policy | Data |
|---|---|---|---|
| A2C | Discrete or continuous | Stochastic actor-critic | On-policy rollout |
| DQN / DDQN | Discrete | Epsilon-greedy Q policy | Replay buffer |
| PPO | Discrete or continuous | Clipped stochastic policy | On-policy rollout |
| DDPG | Continuous | Deterministic | Replay buffer |
| SAC+gSDE | Continuous | Entropy-regularized gSDE | Replay buffer |
| REINFORCE | Discrete | Categorical policy | Complete episode |
| Q-learning | Discrete | Epsilon-greedy linear Q | Transition |
| True Online Sarsa(&lambda;) | Discrete | Epsilon-greedy linear Q | Transition |

Environments with bundled adapters include CartPole, MountainCar,
ContinuousMountainCar, Pendulum, and Maze. Image-observation variants with
feature layers (CNN/RNN) are available for some environments, and dictionary
observations with action masks are supported.

See the [Agents reference](/rindow-rl-agents/) for hyperparameters,
feature extractors, exploration strategies (epsilon-greedy, policy sampling,
OU noise, Gaussian noise, gSDE), and per-algorithm runners.

Demo videos
-----------
The following clips were recorded from the executable sample programs in the
Rindow RL Agents repository (`samples/`). Each sample can be run from the
repository root, for example `php samples/cartpole-dqn.php`.

<div class="container">
  <div class="row">
    <div class="col-lg-6">
      <h4>CartPole (DQN)</h4>
      <video controls preload="metadata" width="100%" src="/neuralnetworks/videos/cartpole.mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="col-lg-6">
      <h4>Maze</h4>
      <video controls preload="metadata" width="100%" src="/neuralnetworks/videos/maze.mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-6">
      <h4>MountainCar</h4>
      <video controls preload="metadata" width="100%" src="/neuralnetworks/videos/mountaincar.mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="col-lg-6">
      <h4>Pendulum</h4>
      <video controls preload="metadata" width="100%" src="/neuralnetworks/videos/pendulum.mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>

Available sample environments and algorithms:

| Environment | Algorithms |
|---|---|
| CartPole | A2C, DQN, PPO, Q-learning, REINFORCE, Sarsa |
| Maze | A2C, DQN, PPO, Q-learning, Sarsa |
| MountainCar | A2C, DQN, PPO, Q-learning, Sarsa |
| ContinuousMountainCar | A2C, DDPG, PPO+gSDE, SAC+gSDE |
| Pendulum | A2C, DDPG, PPO+gSDE, SAC+gSDE |

Next steps
----------
- Read the **[Rindow RL Agents Reference](/rindow-rl-agents/)** for getting
  started, core concepts, configuration, training runners, environment
  adapters, checkpoint persistence, CPU/GPU backends, and the full API index.
- Learn how the neural-network models behind the agents are built in
  [How to use Builders](builders.html) and
  [How to create a custom model](custommodel.html).
