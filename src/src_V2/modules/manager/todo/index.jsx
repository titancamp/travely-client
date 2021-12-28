import {useEffect} from "react";
import { Container } from '../../../components';

import { Typography } from '@mui/material';
import { managerSidebarConfig } from '../config';
import {
    Dialog,
    Grid,
} from "@mui/material";

import TodoItem from "./TodoItem";
import TodoClient from "../../../../api/todo-client";
import {useToggle} from "../../../hooks";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";

export default function Todo() {
  const { open, toggle } = useToggle();

  const getTodos = async () => {
      const data = await TodoClient.getTodos();
  }

  useEffect(() => {
      getTodos();
  }, []);

  return (
      <Container managerSidebarConfig={managerSidebarConfig}>
          <Grid
              container
              direction='column'
              spacing={3}
              pr={3}
          >
              <Grid item>
                  <Typography variant='h5'>To Do List</Typography>
              </Grid>
              <TodoFilter toggle={toggle} />
              <Grid item sx={{ width: '100%', display: 'grid', gridGap: 16,  }}>
                  <TodoItem
                      title='Call to check for hotels'
                      reminderTime='Today, 13:00'
                      tourLocation='Haghpat, Sanahin'
                      description={`The tour creation requires to check the hotel availability and send the information to tourists.The tour creation requires to check the hotel availability and send the information to tourists. The tour
                   The tour creation requires to check the hotel availability and send the information to tourists.The tour creation requires to check the hotel availability and send the information to tourists. The tour`}
                      priority='low'
                      reminderState='SENT'
                      status='done'
                  />
                  <TodoItem
                      title='Call to check for hotels'
                      reminderTime='Today, 13:00'
                      tourLocation='Haghpat, Sanahin'
                      description={`The tour creation requires to check the hotel availability and send the information to tourists.The tour creation requires to check the hotel availability and send the information to tourists. The tour
                   The tour creation requires to check the hotel availability and send the information to tourists.The tour creation requires to check the hotel availability and send the information to tourists. The tour`}
                      priority='medium'
                      reminderState='NOT_SET'
                      status='todo'
                  />
                  <TodoItem
                      title='Call to check for hotels'
                      reminderTime='Today, 13:00'
                      tourLocation='Haghpat, Sanahin'
                      description={`The tour creation requires to check the hotel availability and send the information to tourists.The tour creation requires to check the hotel availability and send the information to tourists. The tour
                   The tour creation requires to check the hotel availability and send the information to tourists.The tour creation requires to check the hotel availability and send the information to tourists. The tour`}
                      priority='high'
                      reminderState='SET'
                      status='in_progress'
                  />
              </Grid>
          </Grid>
          <Dialog
              open={open}
              onClose={toggle}
              PaperProps={{
                  sx: {
                      width: 600
                  },
              }}
          >
              <TodoForm onClose={toggle}/>
          </Dialog>
      </Container>
  );
}
