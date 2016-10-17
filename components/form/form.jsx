var React = require('react');
var FormBus = require('components/form-bus');

var Form = React.createClass({
    getDefaultProps: function () {
        return {
            // уникальное название формы, для нескольких форм на одной странице
            // следует задать элементам каждой формы уникальный formns
            formns: 'form_event',
            onSubmit: function (model) {
                // переопределите этот метод при создании родительского класса
            }
        };
    },
    getInitialState: function () {
        return {
            // состояние модели формы
            model: {},
            // ошибки формы
            errors: {},
            // состояние проверки формы
            valid: true
        };
    },
    componentWillMount: function () {
        // схема валидации пустая при загрузке, чтобы форма
        // не валидировала пустые значения при отрисовке
        this.schema = {};
        // подписываемся на события
        FormBus.Form.attachForm.bind(this)();
    },
    componentWillUnmount: function () {
        // отписываемся от событий
        FormBus.Form.detachForm.bind(this)();
    },
    componentDidMount: function () {
        // после загрузки формы, загружаем настоящую схему
        this.schema = this.props.schema();
    },
    submit: function (e) {
        var component = this;
        e.preventDefault();
        // принудительный запуск валидации после отправки формы
        FormBus.Form.validate.bind(this)()
        // после завершения валидации, будет выполнен promise
            .then(function () {
                if (component.state.valid) {
                    // если форма валидна, запускаем назначенный обработчик
                    component.props.onSubmit(component.state.model);
                }
            });
    },
    render: function () {
        return (
            <form noValidate="novalidate" onSubmit={this.submit}>
                {this.props.children}
                <div className="form-group">
                    <div className="col-sm-offset-2">
                        <button className="btn btn-primary" type="submit">Сохранить</button>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = Form;