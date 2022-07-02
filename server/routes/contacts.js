const express = require('express')
const router  = express.Router();

const sequenceGenerator = require('./sequence');
const Contact = require('../model/contacts')

router.get('/',(req,res,next)=>{
  return Contact.find({}).populate('group').then((contacts)=>{
    res.status(200).json(contacts)

  }).catch((err)=>{
    res.status(500).json({
      message: 'Error getting documents'
    })
  })
})
router.post('/',(req,res,next)=>{
  const maxDocumentId = sequenceGenerator.nextId("contacts");
  const contact = new Contact({
    id: maxDocumentId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        document: createdContact
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
  Contact.findOne({ id: req.params.id })
    .then(message => {
      message.name= req.body.name;
      message.email= req.body.email;
      message.phone= req.body.phone;
      message.imageUrl= req.body.imageUrl;
      message.group= req.body.group;



      Contact.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
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
        message: 'Contact not found.',
        error: { document: 'Contact not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(document => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
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
        message: 'Contact not found.',
        error: { document: 'Contact not found'}
      });
    });
});
module.exports = router;
