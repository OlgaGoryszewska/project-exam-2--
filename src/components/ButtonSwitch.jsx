import * as React from 'react'
import PropTypes from 'prop-types'
import Switch, { switchClasses } from '@mui/joy/Switch'

export default function ButtonSwitch({ checked, onChange }) {
    const handleSwitchChange = (event) => {
        onChange(event.target.checked)
    }

    ButtonSwitch.propTypes = {
        checked: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    return (
        <Switch
            checked={checked}
            onChange={handleSwitchChange}
            sx={(theme) => ({
                '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                '--Switch-thumbSize': '22px',
                '--Switch-trackWidth': '51px',
                '--Switch-trackHeight': '27px',
                '--Switch-trackBackground':
                    theme.vars.palette.background.level3,
                [`& .${switchClasses.thumb}`]: {
                    transition: 'width 0.2s, left 0.2s',
                },
                '&:hover': {
                    '--Switch-trackBackground':
                        theme.vars.palette.background.level3,
                },
                '&:active': {
                    '--Switch-thumbWidth': '32px',
                },
                [`&.${switchClasses.checked}`]: {
                    '--Switch-trackBackground': 'rgb(68 70 138 )',
                    '&:hover': {
                        '--Switch-trackBackground': 'rgb(68 70 138)',
                    },
                },
            })}
        />
    )
}
