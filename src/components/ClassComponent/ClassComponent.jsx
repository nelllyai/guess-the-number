import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    toContinue: true,
    result: 'Результат',
    userNumber: '',
    randomNumber: this.generateRandomNumber(),
    count: 0,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного!`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного!`,
        };
      }

      return {
        toContinue: false,
        result: `Вы угадали, это ${state.userNumber}!
          Кол-во попыток: ${state.count}`,
      };
    });

    this.setState({
      userNumber: '',
    });
  };

  handleChange = event => {
    this.setState({
      userNumber: event.target.value,
    });
  };

  handleClick = () => {
    this.setState({
      toContinue: true,
      result: 'Результат',
      randomNumber: this.generateRandomNumber(),
      count: 0,
    });
  };

  generateRandomNumber() {
    return Math.floor(Math.random() * this.props.max - this.props.min + 1) +
      this.props.min;
  }

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form
          className={style.form}
          onSubmit={this.handleSubmit}
        >
          {this.state.toContinue ?
            <>
              <label className={style.label} htmlFor='user_number'>
                Угадай число
              </label>

              <input className={style.input} type='number' id='user_number'
                onChange={this.handleChange} value={this.state.userNumber} />

              <button className={style.btn} type='submit'>Угадать</button>
            </> :
            <button className={style.btn} type='button'
              onClick={this.handleClick}>
              Сыграть еще
            </button>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
