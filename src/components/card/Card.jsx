import Icon from "../icons/Icon";
import './Card.css'
function Card({ player, onPlay, index, disabled }) {
    let icon = <Icon />
    if (player === 'X') {
        icon = <Icon name="cross" />
    } else if (player === 'O') {
        icon = <Icon name="circle" />
    }

    function handleClick() {
        if (!disabled && !player) {
            onPlay(index)
        }
    }
    return (
        <div className={`card ${disabled ? 'disabled' : ''}`} onClick={handleClick}>
            {icon}
        </div>
    )
}

export default Card