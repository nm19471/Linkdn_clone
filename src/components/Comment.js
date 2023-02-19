import { useState } from "react";
// import InputEmoji from "react-input-emoji";
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { db, postsRef } from "../firebase";


const Comment=(props)=>{

    const [text,setText]=useState("");

    const postComment=()=>{
        updateDoc(doc(postsRef,props.postID),{
          comments: [
              {
                name: props.user.displayName,
                photo: props.user.photoURL,
                email: props.user.email,
                text,
              },
              ...props.comments,
          ],
        })
        setText("")
    }
    return(
        <Container>
        <div className="input">
          <img src={props.photo} alt="user" />
          <input
            value={text}
            onChange={(e)=>{setText(e.currentTarget.value)}}
            // cleanOnEnter
            // onEnter={sendComment}
            placeholder="Add a comment..."
          />
        </div>
         {text && <Postbutton onClick={()=>postComment()}>Post</Postbutton>}


        {props.comments.map((comment)=>(
         <CommentConatiner>
          <img  src={comment?.photo} alt=""/>
          <div className="content">
            <div className="header">
              <div className="info">
               <h6>{comment.name}</h6>
               <span>{comment.email}</span>
              </div>
              <img src="../images/ellipses.svg" alt=""/>
            </div>
            <p>{comment.text}</p>
          </div>
         </CommentConatiner>
        ))}

        </Container>
    )
}
export default Comment;

const Container = styled.div`
  padding: 5px 16px 8px;
  margin-left: 12%;
  .input {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    input{
      border-radius: 25px;
      font-weight: 400;
      margin-left: 15px;
      width: 60%;
      padding: 10px;
      border: 1px solid rgba(0,0,0,0.4);
      outline: 1px;
    }
  }
`;

const Postbutton=styled.button`
  width: 50px;
  margin-right: 70%;
  height: 30px;
  border-radius: 15px;
  background-color: #0a66c2;
  color: white;
  border: 1px ;
`;

const CommentConatiner=styled.div`
      display: flex;
      padding-top: 15px;

      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .content{
        width: 90%;
        padding: 10px;
        border-radius: 8px;
        background-color: #f2f2f2;

        .header{
          display: flex;
          justify-content: space-between;

          .info{
            text-align: start;

            h6{
              font-size: 14px;
              color: rgba(0,0,0,1);
              font-weight: 600;
            }

            span{
              font-size: 12px;
              display: block;
              color: rgba(0,0,0,0.6);
            }
          }
          img{
            width: 1rem;
            height: fit-content;
          }
        }

        p{
          padding-top: 10px;
          text-align: start;
        }
      }
`;