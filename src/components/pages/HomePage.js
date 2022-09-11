import React, { useState } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from '../../themes/Themes';
import './HomePage.scss';
import PaitingList from '../paintingList/PaitingList';
// import PaitingPagination from '../paitingPagination/PaitingPagination';
import logo from '../../resource/img/logo.png';
import switcherLight from '../../resource/img/switcher-light.svg';
import switcherDark from '../../resource/img/switcher-dark.svg';
import { useTheme } from '../../hooks/use-theme';

const StyledApp = styled.div`
        color: ${props => props.theme.color}
    `

const HomePage = () => {

    const {theme, setTheme} = useTheme()

    // const [theme, setTheme] = useState('dark');

    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    return (
        <ThemeProvider theme={theme === 'light' ? darkTheme : lightTheme}>
            <GlobalStyles/>
                <StyledApp> 
                    <div className='background'>
                        <div className='container'>
                                <div className="header__inner">
                                    <img src={logo} alt="" />
                                    <button onClick={() => themeToggler()} className='header__btn'>
                                    {theme === 'dark' 
                                        ? <img className='btn-img' src={switcherLight} alt="switcher"/> 
                                        : <img className='btn-img' src={switcherDark} alt="switcher"/> 
                                        }
                                    </button>
                            </div>
                        {/* <PaitingFilter/> */}
                        <PaitingList/>
                    </div>
                </div>
                </StyledApp>
        </ThemeProvider>
        
    );
};

export default HomePage;