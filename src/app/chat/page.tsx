
import '@styles/chat-home.scss';
import { Metadata } from "next";
import Card from '@components/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faComments, faUsers } from '@fortawesome/free-solid-svg-icons';


export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default async function Page(){
    

    return (
      <section className="chat-window">
        <h1 className='chat-window__header'>Chat Homepage</h1>
        <article className="chat-window__cards">
          <Card title='Users'>
            1000 <FontAwesomeIcon className='chat-window__cards__icon' icon={faUsers} />
          </Card>
          <Card title='Public Chats'>
            10  <FontAwesomeIcon className='chat-window__cards__icon' icon={faComments} />
          </Card>
          <Card title='Your Chats'>
            0 <FontAwesomeIcon className='chat-window__cards__icon' icon={faComment} />
          </Card>
        </article>
        <article className="chat-window__chats">
          <Card title='Public Chats'>
            <table className='chat-window__chats__table'>
              <thead>
                <tr>
                  <th>Chat Name</th>
                  <th>Users</th>
                  <th>Messages</th>
                  <th>Join</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chat 1</td>
                  <td>5</td>
                  <td>10</td>
                  <td>Join</td>
                </tr>
                <tr>
                  <td>Chat 2</td>
                  <td>10</td>
                  <td>20</td>
                  <td>Join</td>
                </tr>
                <tr>
                  <td>Chat 3</td>
                  <td>15</td>
                  <td>30</td>
                  <td>Join</td>
                </tr>
              </tbody>

            </table>
          </Card>
        </article>
      </section>
    );
}