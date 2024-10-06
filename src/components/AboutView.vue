<template>
  <div class="about">
    <ul>
      <li>This is a basic app for listing various To do items.</li>
      <li>User can add any to do items by clicking on the 'Add to do' button. Upon clicking on the button user will be
        navigated to a page with a basic form for capturing user inputs. </li>
      <li>User has to enter the <span class="font-bold">title & decription(optional) </span>in the input text field.
      </li>
      <li>The <span class="font-bold">Status</span> & <span class="font-bold">Priority</span> of the to do can be
        selected from the list of pre-populated values.</li>
      <li>Once the user clicks on Add to do button, the corresponding details will be saved in user's browser memory and
        the user will be navigated back to the To do list page.</li>
      <li>In the To do list page, User can sort the items based on the priority by clicking on the table header on the
        <span class="font-bold">Priority</span> column.
      </li>
      <li>User can also view, edit and delete existing to do items by clicking on corresponding icons from the table
        row.
      </li>
      <li>Clicking on Clear all button will erase all the saved to do items.</li>

    </ul>
  </div>
</template>

<style>
li {
  font-size: 16px;
  padding-top: 5px;
}

.font-bold {
  font-weight: 700;
}
</style>
