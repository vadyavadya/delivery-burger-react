import classNames from 'classnames';
import style from './ModalDelivery.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modalDelivery/modalDelivery';
import { changeForm, submitForm, touchFormAction, validationForm } from '../../store/form/formSlice';
import { IMaskInput } from 'react-imask';

export const ModalDelivery = () => {
  const { isOpen } = useSelector(state => state.modal);
  const form = useSelector(state => state.form);
  const { orderList } = useSelector(state => state.order)

  const dispatch = useDispatch();

  const clickCloseModal = () => {
    dispatch(closeModal());
  }

  const handelForm = (e) => {
    dispatch(changeForm({
      field: e.target.name,
      value: e.target.value,
    }));
    dispatch(validationForm());
  }

  const handlePhone = (e) => {
    dispatch(changeForm({
      field: e.name,
      value: e.value,
    }))
    dispatch(validationForm());
  }

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(touchFormAction());
    dispatch(validationForm());
    if (Object.keys(form.validation).length === 0 && form.touch) {
      dispatch(submitForm({ ...form, orderList }));
    }
  }

  return isOpen && (
    <div className={style.modal}
      onClick={({ target, currentTarget }) => {
        if (target === currentTarget) {
          clickCloseModal();
        }
      }}>
      <div className={style.mdelivery}>
        <div className={style.container}>
          <h2 className={style.title}>Доставка</h2>
          <form className={style.form} id='delivery' onSubmit={formSubmit}>
            <fieldset className={style.fieldset}>
              <label className={style.field}>
                {form.validation.name}
                <input
                  className={classNames(style.input, { [style.input_error]: form.validation.name })}
                  type='text'
                  name='name'
                  placeholder='Ваше имя'
                  value={form.name}
                  onChange={handelForm}
                />
              </label>

              <label className={style.field}>
                {form.validation.phone}
                <IMaskInput
                  mask={'+7 (000) 000-00-00'}
                  onAccept={(mask, value) => handlePhone(value.el.input)}
                  placeholder='Телефон'
                  name='phone'
                  value={form.phone}
                  className={classNames(style.input, { [style.input_error]: form.validation.phone })}
                />
              </label>
            </fieldset>

            <fieldset className={style.fieldset_radio}>
              <label className={style.label}>
                <input
                  className={style.radio}
                  type='radio'
                  name='format'
                  value='pickup'
                  checked={form.format === 'pickup'}
                  onChange={handelForm}
                />
                <span>Самовывоз</span>
              </label>

              <label className={style.label}>
                <input
                  className={style.radio}
                  type='radio'
                  name='format'
                  value='delivery'
                  checked={form.format === 'delivery'}
                  onChange={handelForm}
                />
                <span>Доставка</span>
              </label>
            </fieldset>
            {
              form.format === 'delivery' &&
              (
                <fieldset className={style.fieldset}>
                  <label className={style.field}>
                    {form.validation.address}
                    <input
                      className={classNames(style.input, { [style.input_error]: form.validation.address })}
                      type='text'
                      name='address'
                      placeholder='Улица, дом, квартира'
                      value={form.address}
                      onChange={handelForm}
                    />
                  </label>
                  <label className={classNames(style.field, style.field_half)}>
                    {form.validation.floor}
                    <input
                      className={classNames(style.input, style.input_half, { [style.input_error]: form.validation.floor })}
                      type='number'
                      name='floor'
                      placeholder='Этаж'
                      value={form.floor}
                      onChange={handelForm}
                    />
                  </label>
                  <label className={classNames(style.field, style.field_half)}>
                    {form.validation.intercom}
                    <input
                      className={classNames(style.input, style.input_half, { [style.input_error]: form.validation.intercom })}
                      type='number'
                      name='intercom'
                      placeholder='Домофон'
                      value={form.intercom}
                      onChange={handelForm}
                    />
                  </label>
                </fieldset>
              )
            }

          </form>

          {
            form.response &&
            <div>{form.response}</div>
          }

          <button className={style.submit} type='submit' form='delivery'>
            Оформить
          </button>
        </div>

        <button
          className={style.modal__close}
          type='button'
          onClick={clickCloseModal}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='5.07422'
              y='5.28247'
              width='1'
              height='20'
              transform='rotate(-45 5.07422 5.28247)'
            />
            <rect
              x='5.78125'
              y='19.4246'
              width='1'
              height='20'
              transform='rotate(-135 5.78125 19.4246)'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
