/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('Kegerator')
      cy.get('[data-test="add-item"]').click()
      cy.contains('Kegerator')
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Kegerator')
      cy.get('[data-test="add-item"]').click()
      cy.get('[data-test="items-unpacked"] > *').contains('Kegerator')
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Kegerator')
      cy.get('[data-test="add-item"]').click()
      cy.get('[data-test="items-unpacked"]').within(() => cy.find('li').last().contains('Kegerator'))
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth')
      cy.contains('Tooth Brush')
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth')
      cy.contains('Deoderent').should('not.exist')
    });

  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click()
        cy.contains('No items to show', {timeout:15000})
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        // cy.get('[data-test="items-unpacked"] > ul.s-vF8tIk32PFgu > :nth-child(1) > [data-test="remove"]').should('exist')
        cy.get('[data-test="remove"]').should('exist')
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items-unpacked"] > ul > :nth-child(1) > [data-test="remove"]').click()
        cy.get('[data-test="items-unpacked"] > ul').children().should('have.length', 3)
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-packed"]').should('contain', 'No items to show')
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-packed"]').should('contain', 'No items to show')
      cy.get('[data-test="items-unpacked"]').should('contain', "Hoodie")
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-packed"] > ul > :nth-child(1) > label > input').click()
      cy.get('[data-test="items-unpacked"]').should('contain', 'Hoodie')
    });
  });
});
