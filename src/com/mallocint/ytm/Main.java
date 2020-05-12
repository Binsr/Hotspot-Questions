package com.mallocint.ytm;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean(name = "main")
@RequestScoped
public class Main {

   private Boolean  isQuestionRendered = false;
   private Boolean  questionBtnRender  = true;
   private Boolean  isAnsweringRendered;
   private Question question;

   public Main() {
      question = new Question();
      isAnsweringRendered = false;
   }

   public Boolean getIsQuestionRendered() {
      return isQuestionRendered;
   }

   public void questionRender() {
      this.isQuestionRendered = !this.isQuestionRendered;
      this.questionBtnRender = false;
   }

   public Boolean getQuestionBtnRender() {
      return questionBtnRender;
   }

   public void questionBtnRender() {
      this.questionBtnRender = !this.questionBtnRender;
   }

   public Question getQuestion() {
      if (question == null)
         question = new Question();
      return question;
   }

   public void setQuestion(Question question) {
      this.question = question;
   }

   public Boolean getIsAnsweringRendered() {
      return isAnsweringRendered;
   }

   public void setIsAnsweringRendered() {
      this.isAnsweringRendered = !this.isAnsweringRendered;
   }
}
