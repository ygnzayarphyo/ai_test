<?php

namespace App\Conversations;

use Illuminate\Foundation\Inspiring;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Conversations\Conversation;

class ExampleConversation extends Conversation
{
    protected $year,$month, $day;

    public function askYear()
    {
      $this->ask('Year(number only)>', function(Answer $answer) {
          // Save result
          $this->year = $answer->getText();
          if(!is_numeric($this->year)) {
            $this->say("only numeric allow. try again...");
            $this->askYear();
          }else{
            $this->year= (int) $this->year;
            $this->askMonth();
          }
      });
    }
    public function askMonth()
    {
      $this->ask('Month(number only)>', function(Answer $answer) {
          // Save result
          $this->month = $answer->getText();
          if(!is_numeric($this->month)) {
            $this->say("only numeric allow. try again...");
            $this->askMonth();
          }else{
            $this->month=(int) $this->month;
            if($this->month<=0 || $this->month>12){
              $this->say("There are only 12 months(1 to 12) in a year. try again...");
              $this->askMonth();
            }else{
              $this->askDay();
            }
          }

      });
    }
    public function askDay()
    {
      $this->ask('Day(number only)>', function(Answer $answer) {
          $this->day = $answer->getText();
          if(!is_numeric($this->day)) {
            $this->say("only numeric allow. try again...");
            $this->askDay();
          }else{
            $this->day=(int) $this->day;
            if(!checkdate($this->month, $this->day, $this->year)){
              $this->say("Invalid day detected. try again...");
              $this->askDay();
            } elseif($this->day<=0 || $this->day>31){
              $this->say("Invalid day detected. Number must between 1 to 31. try again...");
              $this->askDay();
            } else{
              $this->showAnswer();
            }
          }
      });
    }
    public function showAnswer(){
      $monthName = date("F", mktime(0, 0, 0, $this->month, 10));
      $date=$this->year."-".$this->month."-".$this->day;
      $jd = cal_to_jd(CAL_GREGORIAN,$this->month,$this->day,$this->year);

      $this->say($monthName." ".$this->day.", ".$this->year." is ".(jddayofweek($jd,1)).". 😎");
    }

    /**
     * Start the conversation
     */
    public function run()
    {
        $this->askYear();
    }
}
