const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// gets all member
router.get('/',function(req, res){
    res.json(members);
});
// get single member
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

// create member
router.post('/', function(req,res){
    // res.send(req.body);
    const newMember = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please include a name and email'})
    }

    members.push(newMember);
    res.json(members)
});

//update member
router.put('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: 'Member updated', member});
            }
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

// delete member
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

module.exports = router;
