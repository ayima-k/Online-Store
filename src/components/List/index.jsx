import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IoManOutline, IoWomanOutline } from 'react-icons/io5';
import { MdChildCare } from 'react-icons/md';
import { GiConverseShoe } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

export default function ListDividers() {
  const [value, setValue] = React.useState('')
  const navigate = useNavigate()

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background',
  };

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button style={value == 'woman' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
        setValue('woman')
        setTimeout(() => navigate(`/cards/category/${value}`), 500)
      }}>
        <span><IoWomanOutline/></span>
        <ListItemText primary="Женщинам" />
      </ListItem>
      <ListItem button style={value == 'man' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
        setValue('man')
        setTimeout(() => navigate(`/cards/category/${value}`), 500)
      }}>
        <span><IoManOutline/></span>
        <ListItemText primary="Мужчинам" />
      </ListItem>
      <ListItem button style={value == 'kid' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
        setValue('kid')
        setTimeout(() => navigate(`/cards/category/${value}`), 500)
      }}>
        <span><MdChildCare/></span> 
        <ListItemText primary="Детям" />
      </ListItem>
      <ListItem button style={value == 'shoes' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
        setValue('shoes')
        setTimeout(() => navigate(`/cards/category/${value}`), 500)
      }}>
        <span><GiConverseShoe/></span> 
        <ListItemText primary="Обувь" />
      </ListItem>
    </List>
  );
}