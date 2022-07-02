const express = require('express')
const sequenceGenerator = require("./sequence");
const router  = express.Router();
const Message = require('../model/messages')
router.get('/',(req,res,next)=>{
  return Message.find({}).then((messages)=>{
    res.status(200).json(messages)

  }).catch((err)=>{
    res.status(500).json({
      message: 'Error getting documents'
    })
  })
})
router.post('/',(req,res,next)=>{
  const maxDocumentId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxDocumentId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        document: createdMessage
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { document: 'Message not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(document => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { document: 'Message not found'}
      });
    });
});


module.exports = router;
